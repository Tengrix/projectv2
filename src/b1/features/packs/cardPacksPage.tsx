import {makeStyles, Modal, TableBody, TableCell} from "@material-ui/core";
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
    isChecked: boolean;
    status: RequestStatusType
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
const CardPacksPage = (props: cardPacksPageType) => {
    const dispatch = useDispatch()

    const [edit, setEdit] = useState<boolean>(true)
    const [newName, setNewName] = useState<string>(props.packs.name)
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = useState<boolean>(false);
    const [del,setDel] = useState<boolean>(false)
    const param = {
        id:props.packs._id,
        name:newName
    }
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const deletePack = (id: string) => {
        dispatch(delPack(id))
    }
    const updPack = (param:{id: string, name: string}) => {
        dispatch(updatePackName({name: newName}))
        dispatch(updatePack(param))
        setOpen(false)
    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <input type="text" value={newName} onChange={(e) => setNewName(e.currentTarget.value)}/>
            <button disabled={props.status === 'loading'} onClick={()=>setDel(true)}>del</button>
            {edit ?
                <span>
                <button disabled={props.status === 'loading'} onClick={() => updPack(param)}>save
            </button>
            </span>
                : ''}
            { del?
            <div>
            Are you sure?
            <button disabled={props.status === 'loading'} onClick={() => deletePack(props.packs._id)}>yes</button>
            <button disabled={props.status === 'loading'} onClick={()=>setDel(false)}>no</button>

        </div>:''}


        </div>
    )
    return (
        <TableBody>
            <TableCell component="th" scope="row">
                {props.packs.name}
            </TableCell>
            <TableCell component="th" scope="row">{props.packs.cardsCount}</TableCell>
            <TableCell align="right">{props.packs.created}</TableCell>
            <TableCell align="right">{props.packs.updated}</TableCell>
            {props.isChecked &&
            <TableCell align="right">
                <button disabled={props.status === 'loading'} type="button" onClick={handleOpen}>
                    Edit
                </button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </TableCell>
            }
            <NavLink to={'/cards/' + props.packs._id}>
                <button disabled={props.status === 'loading'}>explore</button>
            </NavLink>
        </TableBody>
    )
}
export default CardPacksPage;