import {Dispatch} from "redux";
import {authAPI, userType} from "../DAL/mainAPI";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type initialStateType ={
    isLoggedIn:boolean;
    isRegistered:boolean;
    isInitialized:boolean;
    user:userType
    updatedUser:{},
    isPassUpdated:boolean,
    isPassSet:boolean,
    status:RequestStatusType
}
const initialState:initialStateType = {
    isLoggedIn: false,
    isRegistered:false,
    isInitialized:false,
    user: {
        _id: "",
        email: "",
        name: "",
        avatar: "",
    },
    updatedUser:{    },
    isPassUpdated:false,
    isPassSet:false,
    status:'idle'
}
const slice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        getLoginAC(state, action:PayloadAction<{value:boolean}>){
            state.isLoggedIn = action.payload.value
        },
        registerNewUser(state, action:PayloadAction<{value:boolean}>){
            state.isRegistered = action.payload.value
        },
        getMe(state, action:PayloadAction<{value:boolean}>){
            state.isInitialized = action.payload.value
        },
        getUpdatedUser(state, action:PayloadAction<{name:string}>){
            state.updatedUser = action.payload.name
        },
        getUser(state, action:PayloadAction<{user:userType}>){
            state.user = action.payload.user
        },
        forgotPass(state, action:PayloadAction<{value:boolean}>){
            state.isPassUpdated = action.payload.value
        },
        setPass(state, action:PayloadAction<{value:boolean}>){
            state.isPassSet = action.payload.value
        },
        setAppStatusAC:(state, action:PayloadAction<{status:RequestStatusType}>)=>{
            state.status = action.payload.status
        }
    }
})
export const {getLoginAC, registerNewUser, getMe, getUpdatedUser, getUser, forgotPass, setPass,setAppStatusAC} = slice.actions
export const authReducer = slice.reducer

export const getLoginTC = (email:string,pass:string, rememberMe:boolean) => (dispatch:Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.login(email,pass,rememberMe).then((res)=>{
        const {_id, name, email, avatar} = res.data
        dispatch(getLoginAC({value:true}))
        dispatch(getUser({user:{_id, name, email, avatar}}))
        dispatch(setAppStatusAC({status:'succeeded'}))

    })
        .catch((e)=>{
            const error = e.response? e.response.data.error:
                (e.message+',more details in the console')
            console.log('Error: ', {...e})
        })
}
export const getRegisterTC = (email:string, password:string) => (dispatch:Dispatch) =>{
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.register(email,password).then((res)=>{
            dispatch(registerNewUser({value:true}))
        dispatch(setAppStatusAC({status:'succeeded'}))
    })
        .catch((e)=>{
        const error = e.response? e.response.data.error:
            (e.message+',more details in the console')
            console.log('Error: ', {...e})
    })
}
export const authMe = () => (dispatch:Dispatch) =>{
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.me().then((res)=>{
        dispatch(getLoginAC({value:true}))
        dispatch(getUser({user:res.data}))
        dispatch(setAppStatusAC({status:'succeeded'}))
    })
        .catch((e)=>{
            const error = e.response? e.response.data.error:
                (e.message+',more details in the console')
            console.log('Error: ', {...e})
        }).finally(()=>{
        dispatch(getMe({value:true}))
    })
}

export const UpdatedUserTC = ((name:string) => (dispatch:Dispatch) =>{
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.updateUser(name).then((res)=>{
        dispatch(getUpdatedUser({name}))
        dispatch(setAppStatusAC({status:'succeeded'}))
    })
        .catch((e)=>{
            const error = e.response? e.response.data.error:
                (e.message+',more details in the console')
            console.log('Error: ', {...e})
        })
})
export const logOutTC = (() => (dispatch:Dispatch) =>{
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.logOut().then((res)=>{
        dispatch(getLoginAC({value:false}))
        dispatch(setAppStatusAC({status:'succeeded'}))
    })
        .catch((e)=>{
            const error = e.response? e.response.data.error:
                (e.message+',more details in the console')
            console.log('Error: ', {...e})
        })
})
export const getUserProfile = (() => (dispatch:Dispatch) =>{
    authAPI.me().then((res)=>{
        const {_id, name, email, avatar} = res.data
        dispatch(getUser({user:{_id, name, email, avatar}}))
    })
        .catch((e)=>{
            const error = e.response? e.response.data.error:
                (e.message+',more details in the console')
            console.log('Error: ', {...e})
        })
})
export const forgotPassTC = (email:string,from:string, message:string) => (dispatch:Dispatch) =>{
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.forgot(email,from,message).then((res)=>{
        dispatch(forgotPass({value:true}))
        dispatch(setAppStatusAC({status:'succeeded'}))
    })
}
export const setPassTC = (pass:string, token:string) => (dispatch:Dispatch) =>{
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.setPassword(pass,token).then((res)=>{
        dispatch(setPass({value:true}))
        dispatch(setAppStatusAC({status:'succeeded'}))
    })
}