import React, {ChangeEvent, useState} from "react";
import {RequestStatusType} from "../../../a1-main/BLL/authReducer";
import {initialStateType} from "../../../a1-main/BLL/packReducer";
import {makeStyles, Modal} from "@material-ui/core";

type CreateNewPackType = {
    status:RequestStatusType;
    packData:initialStateType;
    newPackHandler:(title:string)=>void
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

const CreateNewPack = (props:CreateNewPackType) => {
    const [title, setTitle] = useState<string>(props.packData.newCardsPack.name)
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addNewPack = (title:string) => {
        props.newPackHandler(title)
        setOpen(false)
    }
    const body = (
    <div style={modalStyle} className={classes.paper}>
        <input disabled={props.status==='loading'} placeholder={'New Pack'} type="text" value={title} onChange={onChangeName}/>
        <button disabled={props.status==='loading'} onClick={() => addNewPack(title)}>add</button>
    </div>
    )
    return(
        <div>
            <button type="button" onClick={handleOpen}>
                Add new pack
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
export default CreateNewPack;