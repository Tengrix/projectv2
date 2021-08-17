import React, {useState} from "react";
import {RequestStatusType} from "../../../a1-main/BLL/authReducer";
import {makeStyles, Modal} from "@material-ui/core";
type DeleteCardType = {
    status:RequestStatusType;
    deleteCard:(id:string)=>void;
    id:string;
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
const DeleteCard = (props:DeleteCardType) => {
    const [del,setDel] = useState<boolean>(false)
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setDel(true)
    };

    const handleClose = () => {
        setOpen(false);
    };
    const body = (
        <div style={modalStyle} className={classes.paper}>
            { del ?
                <div>
                    Are you sure?
                    <button disabled={props.status === 'loading'} onClick={()=>props.deleteCard(props.id)}>yes</button>
                    <button disabled={props.status === 'loading'} onClick={handleClose}>no</button>
                </div>
                :''}
        </div>

    )
    return(
        <div>
            <button type="button" onClick={handleOpen}>
                delete card
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
export default DeleteCard;