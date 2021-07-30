import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile, UpdatedUserTC} from "../../../a1-main/BLL/authReducer";
import { userType} from "../../../a1-main/DAL/mainAPI";
import {AppRootStateType} from "../../../a1-main/BLL/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../a1-main/UI/Routes/Routes";

const Profile = () =>{
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state => state.auth.isLoggedIn)
    const userData = useSelector<AppRootStateType,userType>(state => state.auth.user)
    const [name, setName] = useState<string>(userData.name)
    const [edit, setEdit] = useState<boolean>(false)
    const [show,setShow] = useState<boolean>(false)
    useEffect(()=>{
        if(!isLoggedIn){
            dispatch(getUserProfile())
        }
    },[dispatch,isLoggedIn])
    const onChangeName = (e:ChangeEvent<HTMLInputElement>) =>{
        setName(e.currentTarget.value)
    }
    const activateEditMode = () => {
        setEdit(true)
        setName(userData.name)
    }
    const activateViewMode = () => {
        setEdit(false);
        dispatch(UpdatedUserTC(name))
    }
    const onClickShow = () => {
        setShow(!show)
    }
    if(!isLoggedIn){
        return <Redirect to={PATH.login}/>
    }
    return(
        <div>
            <div>

                <img src={userData.avatar} alt=""/>
            </div>
            {show &&
                <div>{edit? <input type="text" value={name} autoFocus onBlur={activateViewMode} placeholder={'new name'} onChange={onChangeName}/>:
                    <span onDoubleClick={activateEditMode}>{name}</span>
                }
                </div>
            }
            <button onClick={onClickShow}>show</button>

        </div>
    )
}
export default Profile