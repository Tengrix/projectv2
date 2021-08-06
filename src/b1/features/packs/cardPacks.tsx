import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useEffect, useState} from "react";
import {
    changeSort,
    checkMyPack,
    createNewPack,
    getPacksTC,
} from "../../../a1-main/BLL/packReducer";
import {AppRootStateType} from "../../../a1-main/BLL/store";
import {cardPacksType} from "../../../a1-main/DAL/mainAPI";
import {Table} from "reactstrap";
import {Paper, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../a1-main/UI/Routes/Routes";
import CardPacksPage from "./cardPacksPage";
import {RequestStatusType} from "../../../a1-main/BLL/authReducer";

const CardPacks = () => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType,RequestStatusType>(state => state.auth.status)
    const packs = useSelector<AppRootStateType, cardPacksType[]>(state => state.packs.cardPacks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const name = useSelector<AppRootStateType, string>(state => state.packs.newCardsPack.name)
    const isChecked = useSelector<AppRootStateType, boolean>(state => state.packs.myCardsPack)

    const [title, setTitle] = useState<string>(name)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [checked, setChecked] = useState<boolean>(isChecked)
    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
        dispatch(getPacksTC())
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        dispatch(getPacksTC())
    };
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
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
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
    return (

        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <input type="checkbox" checked={checked} onChange={isItMyPack}/>
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
                            <input disabled={status==='loading'} type="text" value={title} onChange={onChangeName}/>
                            <button disabled={status==='loading'} onClick={() => newPackHandler(title)}>add</button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                    {packs.map((el) => (

                         <CardPacksPage
                             key={el._id}
                             packs={el}
                             isChecked={isChecked}
                             status={status}
                         />

                    ))}
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={packs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    )
}
export default CardPacks