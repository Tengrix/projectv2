import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {createCardTC, delCardTC, getCardsTC, sortCards} from "../../../a1-main/BLL/cardReducer";
import {AppRootStateType} from "../../../a1-main/BLL/store";
import {cardType} from "../../../a1-main/DAL/mainAPI";
import {Redirect, useParams} from "react-router-dom";
import Card from "./Card";
import {PATH} from "../../../a1-main/UI/Routes/Routes";
import {Paper, Table, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {RequestStatusType} from "../../../a1-main/BLL/authReducer";

const Cards = () => {
    const dispatch = useDispatch()
    const cards = useSelector<AppRootStateType, cardType[]>(state => state.cards.cards)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const status = useSelector<AppRootStateType,RequestStatusType>(state => state.auth.status)
    const {packID} = useParams<{ packID: string }>()
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();
    useEffect(() => {
        dispatch(getCardsTC(packID))
    }, [dispatch,packID])
    const getSortedCards = (name: '0grade' | '1grade' | '0shot' | '1shot') => {
        dispatch(sortCards({value: name}))
        dispatch(getCardsTC(packID))
    }
    const addNewCard = (id:string) => {
        dispatch(createCardTC(id))
    }
    if (!isLoggedIn) {
        return <Redirect to={PATH.login}/>
    }
    const delCardHandler = (id:string) =>{
        dispatch(delCardTC(id))
        dispatch(getCardsTC(packID))
    }
    // if(!isCreated){
    //     return <div>loading</div>
    // }
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Questions</TableCell>
                        <TableCell align="left">Answers</TableCell>
                        <TableCell align="left">
                            <button disabled={status==='loading'} onClick={() => getSortedCards('1shot')}>↑</button>
                            <button disabled={status==='loading'} onClick={() => getSortedCards('0shot')}>↓</button>
                            Shots
                        </TableCell>
                        <TableCell align="left">
                            <button disabled={status==='loading'} onClick={() => getSortedCards('1grade')}>↑</button>
                            <button disabled={status==='loading'} onClick={() => getSortedCards('0grade')}>↓</button>
                            Grades
                        </TableCell>

                    </TableRow>
                </TableHead>
                {cards.length && cards.map((el) =>
                    <Card
                        key={el._id}
                        id={el._id}
                        card={el}
                        delCardHandler={delCardHandler}
                        packId={packID}
                        addNewCard={addNewCard}
                        status={status}
                    />)}
            </Table>
        </TableContainer>
    )
}
export default Cards;