import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useEffect, useState} from "react";
import {
    changeSort,
    checkMyPack,
    createNewPack,
    getPacksTC, initialStateType,
    setNewPage, setNewPortion,
} from "../../../a1-main/BLL/packReducer";
import {AppRootStateType} from "../../../a1-main/BLL/store";
import {Table} from "reactstrap";
import {Paper, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../a1-main/UI/Routes/Routes";
import CardPacksPage from "./cardPacksPage";
import {RequestStatusType} from "../../../a1-main/BLL/authReducer";
import {TablePaginationActions} from "./TablePagination";
import CreateNewPack from "./addNewPack";

const CardPacks = () => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType,RequestStatusType>(state => state.auth.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const isChecked = useSelector<AppRootStateType, boolean>(state => state.packs.myCardsPack)
    const cardData = useSelector<AppRootStateType,initialStateType>(state => state.packs)
    const [savedData,setSavedData] = useState()
    const [checked, setChecked] = useState<boolean>(isChecked)
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();
    useEffect(() => {
        dispatch(getPacksTC())
    }, [])
    const newPackHandler = (title: string) => {
        dispatch(createNewPack(title))
    }

    if (!isLoggedIn) {
        return <Redirect to={PATH.login}/>
    }
    const isItMyPack = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.checked
        setChecked(newValue)
        dispatch(checkMyPack({value: newValue}))
        dispatch(getPacksTC())
    }
    const newPackSortByName = (name: "0name" | "1name" | "0cardsCount" | "1cardsCount" | '1updated' | '0updated' | '0created' | '1created') => {
        dispatch(changeSort({newSort: name}))
        dispatch(getPacksTC())
    }
    const paginate = (newPage:number,currentPortion:number) => {
        dispatch(setNewPage({newShowPage:newPage}))
        dispatch(setNewPortion({currentPortion:currentPortion}))
        dispatch(getPacksTC())
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                   My pack <input type="checkbox" checked={checked} onChange={isItMyPack}/>
                    <TableRow>
                        <TableCell>
                            <button disabled={status==='loading'} onClick={() => newPackSortByName('1name')}>↑</button>
                            <button disabled={status==='loading'} onClick={() => newPackSortByName('0name')}>↓</button>
                            Name</TableCell>
                        <TableCell align="right">
                            <button disabled={status==='loading'} onClick={() => newPackSortByName('0cardsCount')}>↑</button>
                            <button disabled={status==='loading'} onClick={() => newPackSortByName('1cardsCount')}>↓</button>
                            Cards Count</TableCell>
                        <TableCell align="right">
                            <button disabled={status==='loading'} onClick={() => newPackSortByName('1created')}>↑</button>
                            <button disabled={status==='loading'} onClick={() => newPackSortByName('0created')}>↓</button>
                            Created</TableCell>
                        <TableCell align="right">
                            <button disabled={status==='loading'} onClick={() => newPackSortByName('1updated')}>↑</button>
                            <button disabled={status==='loading'} onClick={() => newPackSortByName('0updated')}>↓</button>
                            Updated</TableCell>
                        <TableCell align="right">
                            <CreateNewPack
                                newPackHandler={newPackHandler}
                                packData={cardData}
                                status={status}/>
                        </TableCell>
                    </TableRow>
                </TableHead>
                    {cardData.cardPacks.map((el) => (
                         <CardPacksPage
                             key={el._id}
                             packs={el}
                             isChecked={isChecked}
                             status={status}
                         />
                    ))}
            </Table>
            <TablePaginationActions
                rowsPerPage={10}
                totalNumberOfPacks={cardData.cardPacksTotalCount}
                page={cardData.page}
                onChangePaginate={paginate}
                portionSize={5}
                currentPortion={cardData.currentPortionToPaginator}
            />
        </TableContainer>
    )
}
export default CardPacks