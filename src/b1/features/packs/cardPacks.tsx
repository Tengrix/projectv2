import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {
    changeSort,
    checkMyPack,
    createNewPack,
    getPacksTC, initialStateType, PackSortType,
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
import s from '../../../common/cards.module.css'
const CardPacks = () => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType,RequestStatusType>(state => state.auth.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const isChecked = useSelector<AppRootStateType, boolean>(state => state.packs.myCardsPack)
    const cardData = useSelector<AppRootStateType,initialStateType>(state => state.packs)
    const sortPack = useSelector<AppRootStateType, PackSortType>(state => state.packs.sortCardsPacks)
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
    const newPackSortByName = (name: PackSortType) => {
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
                            <button className={sortPack==="1name"?s.button:''} disabled={status==='loading'} onClick={() => newPackSortByName('1name')}>↑</button>
                            <button className={sortPack==="0name"?s.button:''} disabled={status==='loading'} onClick={() => newPackSortByName('0name')}>↓</button>
                            Name</TableCell>
                        <TableCell align="right">
                            <button className={sortPack==="0cardsCount"?s.button:''} disabled={status==='loading'} onClick={() => newPackSortByName('0cardsCount')}>↑</button>
                            <button className={sortPack==="1cardsCount"?s.button:''} disabled={status==='loading'} onClick={() => newPackSortByName('1cardsCount')}>↓</button>
                            Cards Count</TableCell>
                        <TableCell align="right">
                            <button className={sortPack==="1created"?s.button:''} disabled={status==='loading'} onClick={() => newPackSortByName('1created')}>↑</button>
                            <button className={sortPack==="0created"?s.button:''} disabled={status==='loading'} onClick={() => newPackSortByName('0created')}>↓</button>
                            Created</TableCell>
                        <TableCell align="right">
                            <button className={sortPack==="1updated"?s.button:''} disabled={status==='loading'} onClick={() => newPackSortByName('1updated')}>↑</button>
                            <button className={sortPack==="0updated"?s.button:''} disabled={status==='loading'} onClick={() => newPackSortByName('0updated')}>↓</button>
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