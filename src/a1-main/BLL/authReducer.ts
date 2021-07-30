import {Dispatch} from "redux";
import {authAPI, userType} from "../DAL/mainAPI";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
type initialStateType ={
    isLoggedIn:boolean;
    isRegistered:boolean;
    isInitialized:boolean;
    user:userType
    updatedUser:{},
    isPassUpdated:boolean,
    isPassSet:boolean,
}
export const initialState:initialStateType = {
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
}
export const slice = createSlice({
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
        }
    }
})
export const {getLoginAC, registerNewUser, getMe, getUpdatedUser, getUser, forgotPass, setPass} = slice.actions
export const authReducer = slice.reducer

export const getLoginTC = (email:string,pass:string, rememberMe:boolean) => (dispatch:Dispatch) => {
    authAPI.login(email,pass,rememberMe).then((res)=>{
        dispatch(getLoginAC({value:true}))
    })
        .catch((e)=>{
            const error = e.response? e.response.data.error:
                (e.message+',more details in the console')
            console.log('Error: ', {...e})
        })
}
export const getRegisterTC = ((email:string, password:string) => (dispatch:Dispatch) =>{
    authAPI.register(email,password).then((res)=>{
            dispatch(registerNewUser({value:true}))
    })
        .catch((e)=>{
        const error = e.response? e.response.data.error:
            (e.message+',more details in the console')
            console.log('Error: ', {...e})
    })
})
export const authMe = (() => (dispatch:Dispatch) =>{
    authAPI.me().then((res)=>{
        dispatch(getLoginAC({value:true}))
        dispatch(getUser({user:res.data}))
    })
        .catch((e)=>{
            const error = e.response? e.response.data.error:
                (e.message+',more details in the console')
            console.log('Error: ', {...e})
        })
        .finally(()=>{
            dispatch(getMe({value:true}))
        })
})

export const UpdatedUserTC = ((name:string) => (dispatch:Dispatch) =>{
    authAPI.updateUser(name).then((res)=>{
        dispatch(getUpdatedUser({name}))
    })
        .catch((e)=>{
            const error = e.response? e.response.data.error:
                (e.message+',more details in the console')
            console.log('Error: ', {...e})
        })
})
export const logOutTC = (() => (dispatch:Dispatch) =>{
    authAPI.logOut().then((res)=>{
        dispatch(getLoginAC({value:false}))
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
    authAPI.forgot(email,from,message).then((res)=>{
        dispatch(forgotPass({value:true}))
    })
}
export const setPassTC = (pass:string, token:string) => (dispatch:Dispatch) =>{
    authAPI.setPassword(pass,token).then((res)=>{
        dispatch(setPass({value:true}))
    })
}