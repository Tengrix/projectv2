import {cardType} from "../../../a1-main/DAL/mainAPI";
import {TableBody, TableCell} from "@material-ui/core";
import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updCardTC} from "../../../a1-main/BLL/cardReducer";
import {AppRootStateType} from "../../../a1-main/BLL/store";
import {RequestStatusType} from "../../../a1-main/BLL/authReducer";

type CardType = {
    card: cardType;
    delCardHandler:(id:string)=>void;
    id:string;
    packId:string;
    addNewCard:(id:string)=>void;
    status:RequestStatusType
}
const Card = (props: CardType) => {
    const dispatch = useDispatch()
    const [show,setShow] = useState<boolean>(false)
    const isChecked = useSelector<AppRootStateType, boolean>(state => state.packs.myCardsPack)
    const showHandler = () => {
        setShow(!show)
    }
    const [newQuestion, setNewQuestion] = useState<string>('')
    const questionUpdHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(e.currentTarget.value)
    }
    const updCard = (id:string,question:string, packId:string ) => {
        dispatch(updCardTC(id,question,packId))
    }
    return (
        <TableBody>
            <TableCell component="th" scope="row">
                {props.card.question}
            </TableCell>
            <TableCell align="left">
                {show && props.card.answer}
                {!show? <button disabled={props.status==='loading'} onClick={() => showHandler()}>show</button>:<button onClick={() => showHandler()}>close</button>}
            </TableCell>
            <TableCell align="left">
                {props.card.shots}
            </TableCell>
            <TableCell align="left">
                {props.card.grade}
            </TableCell>
            {isChecked &&
                <TableCell>
                    <TableCell align="left">
                        <button disabled={props.status==='loading'} onClick={()=>props.delCardHandler(props.id)}>del</button>
                    </TableCell>
                    <TableCell align="left">
                        <input disabled={props.status==='loading'} type="text" value={newQuestion} onChange={questionUpdHandler}/>
                        <button disabled={props.status==='loading'} onClick={()=>updCard(props.id,newQuestion,props.packId)}>upd</button>
                    </TableCell>
                    <TableCell>
                        <button disabled={props.status==='loading'} onClick={()=>props.addNewCard(props.packId)}>add</button>
                    </TableCell>
                </TableCell>

            }
        </TableBody>
    )
}
export default Card;