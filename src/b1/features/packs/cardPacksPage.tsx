import {TableBody, TableCell} from "@material-ui/core";
import React, {useState} from "react";
import {cardPacksType} from "../../../a1-main/DAL/mainAPI";
import {delPack, updatePack, updatePackName} from "../../../a1-main/BLL/packReducer";
import {useDispatch} from "react-redux";
import {getCardsTC} from "../../../a1-main/BLL/cardReducer";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../a1-main/UI/Routes/Routes";
import {RequestStatusType} from "../../../a1-main/BLL/authReducer";

type cardPacksPageType = {
    packs: cardPacksType;
    isChecked:boolean;
    status:RequestStatusType
}

const CardPacksPage = (props:cardPacksPageType) =>{
    const dispatch = useDispatch()

    const [edit, setEdit] = useState<boolean>(true)
    const [newName, setNewName] = useState<string>('')

    const deletePack = (id: string) => {
        dispatch(delPack(id))
    }
    const updPack = (id: string, name: string) => {
        dispatch(updatePackName({name: newName}))
        dispatch(updatePack(id, name))
    }
    const editHandler = () => {
        setEdit(!edit)
    }

    return(
        <TableBody>
            <TableCell component="th" scope="row">
                {props.packs.name}
            </TableCell>
            <TableCell component="th" scope="row">{props.packs.cardsCount}</TableCell>
            <TableCell align="right">{props.packs.created}</TableCell>
            <TableCell align="right">{props.packs.updated}</TableCell>
            {props.isChecked &&
            <TableCell align="right">
                <button disabled={props.status === 'loading'} onClick={() => editHandler()}>edit</button>
                <button disabled={props.status === 'loading'} onClick={() => deletePack(props.packs._id)}>del</button>
                { !edit ? <input type="text" value={newName} onChange={(e) => setNewName(e.currentTarget.value)}/> : ''}
                 <button disabled={props.status === 'loading'} onClick={() => updPack(props.packs._id, newName)}>save</button>
            </TableCell>
            }
            <NavLink to={'/cards/'+props.packs._id}>
                <button disabled={props.status==='loading'}>learn</button>
            </NavLink>
        </TableBody>
    )
}
export default CardPacksPage;