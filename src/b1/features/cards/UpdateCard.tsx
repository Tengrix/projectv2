import React, {ChangeEvent, useState} from "react";
import {RequestStatusType} from "../../../a1-main/BLL/authReducer";
import {makeStyles, Modal} from "@material-ui/core";

type UpdateCardType = {
    status:RequestStatusType;
    updCard:(id:string, question:string, answer:string, packId:string)=>void;
    id:string;
    packId:string;
    question:string;
    answer:string
}
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
const UpdateCard = (props:UpdateCardType) => {
    const [newQuestion, setNewQuestion] = useState<string>(props.question)
    const [newAnswer, setNewAnswer] = useState<string>(props.answer)
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const questionUpdHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(e.currentTarget.value)
    }
    const answerUpdHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewAnswer(e.currentTarget.value)
    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <input disabled={props.status==='loading'} placeholder={'New Question'} type="text" value={newQuestion} onChange={questionUpdHandler}/>
            <input disabled={props.status==='loading'} placeholder={'New Question'} type="text" value={newAnswer} onChange={answerUpdHandler}/>
            <button disabled={props.status==='loading'} onClick={()=>props.updCard(props.id,newQuestion,newAnswer,props.packId)}>upd</button>
        </div>
    )
    return (
        <div>
            <button type="button" onClick={handleOpen}>
                update Card
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    )
}
export default UpdateCard;