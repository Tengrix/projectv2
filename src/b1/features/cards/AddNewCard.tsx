import React, {useState} from "react";
import {RequestStatusType} from "../../../a1-main/BLL/authReducer";
import {makeStyles, Modal} from "@material-ui/core";

type AddNewCardType = {
    addNewCard:(id:string, question:string, answer:string)=>void
    status:RequestStatusType;
    packId:string
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
const AddNewCard = (props:AddNewCardType) => {
    const [newQuestion, setNewQuestion] = useState<string>('')
    const [newAnswer, setNewAnswer] = useState<string>('')
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const body = (
        <div style={modalStyle} className={classes.paper}>
        <input type="text" value={newQuestion} placeholder={'New Question'} onChange={event => setNewQuestion(event.currentTarget.value)}/>
        <input type="text" value={newAnswer} placeholder={'New Answer'} onChange={event => setNewAnswer(event.currentTarget.value)}/>
        <button disabled={props.status==='loading'} onClick={()=>props.addNewCard(props.packId,newQuestion,newAnswer)}>add</button>
    </div>)
    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Add Card
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
export default AddNewCard;
