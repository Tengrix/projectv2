import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useEffect, useState} from "react";
import {
    cardInitialStateType,
    createCardTC,
    delCardTC,
    getCardsTC, setNewCardsPage, setNewCardsPortion, setSearchQuestion,
    sortCards, sortCardsType
} from "../../../a1-main/BLL/cardReducer";
import {AppRootStateType} from "../../../a1-main/BLL/store";
import {Redirect, useParams} from "react-router-dom";
import Card from "./Card";
import {PATH} from "../../../a1-main/UI/Routes/Routes";
import {Paper, Table, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {RequestStatusType} from "../../../a1-main/BLL/authReducer";
import {TablePaginationActions} from "../packs/TablePagination";
import AddNewCard from "./AddNewCard";
import LearningCards from "../LearnMode/LearningCards";
import SearchCard from "./searchCard";
import s from '../../../common/cards.module.css'

const Cards = () => {
    const dispatch = useDispatch()
    const cards = useSelector<AppRootStateType, cardInitialStateType>(state => state.cards)
    const sortCard = useSelector<AppRootStateType, sortCardsType>(state => state.cards.sortCards)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.auth.status)
    const isChecked = useSelector<AppRootStateType, boolean>(state => state.packs.myCardsPack)
    const {packID} = useParams<{ packID: string }>()
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();
    useEffect(() => {
        getSortedCards('1grade')
    }, [dispatch, packID])

    const getSortedCards = (name: sortCardsType) => {
        dispatch(sortCards({value: name}))
        dispatch(getCardsTC(packID))
    }
    const addNewCard = (params: { packId: string, question: string, answer: string }) => {
        dispatch(createCardTC(params))
    }
    if (!isLoggedIn) {
        return <Redirect to={PATH.login}/>
    }
    const delCardHandler = (id: string) => {
        dispatch(delCardTC(id))
        dispatch(getCardsTC(packID))
    }

    const paginate = (newPage: number, currentPortion: number) => {
        dispatch(setNewCardsPage({newShowPage: newPage}))
        dispatch(setNewCardsPortion({currentPortion: currentPortion}))
        dispatch(getCardsTC(packID))
    }
    const searchQuestion = (question: string, answer: string) => {
        dispatch(setSearchQuestion({keyWordForQuestion: question, keyWordForAnswer: answer}))
        dispatch(getCardsTC(packID))
    }
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <div>
                        <LearningCards status={status}
                                       packId={packID}
                        />
                    </div>
                    <SearchCard
                        search={searchQuestion}
                        packID={packID}
                    />
                    <TableRow>
                        <TableCell>Questions</TableCell>
                        <TableCell align="left">Answers</TableCell>
                        <TableCell align="left">
                            <button className={sortCard === "1shots" ? s.button : ''} disabled={status === 'loading'}
                                    onClick={() => getSortedCards('1shots')}>↑
                            </button>
                            <button className={sortCard === "0shots" ? s.button : ''} disabled={status === 'loading'}
                                    onClick={() => getSortedCards('0shots')}>↓
                            </button>
                            Shots
                        </TableCell>
                        <TableCell align="left">
                            <button className={sortCard === "1grade" ? s.button : ''} disabled={status === 'loading'}
                                    onClick={() => getSortedCards('1grade')}>↑
                            </button>
                            <button className={sortCard === "0grade" ? s.button : ''} disabled={status === 'loading'}
                                    onClick={() => getSortedCards('0grade')}>↓
                            </button>
                            Grades
                        </TableCell>
                        <TableCell>
                            {
                                isChecked &&
                                <AddNewCard
                                    packId={packID}
                                    addNewCard={addNewCard}
                                    status={status}/>
                            }

                        </TableCell>
                    </TableRow>
                </TableHead>
                {cards.cards.length && cards.cards.map((el) =>
                    <Card
                        key={el._id}
                        id={el._id}
                        card={el}
                        delCardHandler={delCardHandler}
                        packId={packID}
                        status={status}
                    />)}
            </Table>
            <TablePaginationActions
                rowsPerPage={10}
                totalNumberOfPacks={cards.cardsTotalCount}
                page={cards.page}
                onChangePaginate={paginate}
                portionSize={5}
                currentPortion={cards.currentPortionToPaginator}
            />
        </TableContainer>
    )
}
export default Cards;