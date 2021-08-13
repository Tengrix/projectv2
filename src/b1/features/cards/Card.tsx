import {cardType} from "../../../a1-main/DAL/mainAPI";
import {TableBody, TableCell} from "@material-ui/core";
import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updCardTC} from "../../../a1-main/BLL/cardReducer";
import {AppRootStateType} from "../../../a1-main/BLL/store";
import {RequestStatusType} from "../../../a1-main/BLL/authReducer";
import UpdateCard from "./UpdateCard";

type CardType = {
    card: cardType;
    delCardHandler:(id:string)=>void;
    id:string;
    packId:string;
    addNewCard:(id:string,question:string, answer:string)=>void;
    status:RequestStatusType
}
const Card = (props: CardType) => {
    const dispatch = useDispatch()
    const [show,setShow] = useState<boolean>(false)
    const isChecked = useSelector<AppRootStateType, boolean>(state => state.packs.myCardsPack)
    const showHandler = () => {
        setShow(!show)
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
                        <button disabled={props.status==='loading'} onClick={()=>props.delCardHandler(props.id)}>del</button>
                      <UpdateCard
                          updCard={updCard}
                          status={props.status}
                          id={props.id}
                          packId={props.packId}/>
                </TableCell>

            }
        </TableBody>
    )
}
export default Card;