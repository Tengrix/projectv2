import {Dispatch} from "redux";
import {authAPI, userType} from "../DAL/mainAPI";
type initialStateType ={
    isLoggedIn:boolean;
    isRegistered:boolean;
    isInitialized:boolean;
    updatedUser:{},
    isUpdated:boolean,
    user:userType
}
export const initialState:initialStateType = {
    isLoggedIn: false,
    isRegistered:false,
    isInitialized:false,
    updatedUser:{    },
    isUpdated:false,
    user: {
        _id: "",
        email: "",
        name: "",
        avatar: "",
    }
}
export const authReducer = (state=initialState, action:ActionType) => {
    switch (action.type){
        case "GET-LOGIN":
            return {...state, isLoggedIn: action.value}
        case "NEW-USER":
            return {...state, isRegistered:action.newData}
        case "GET-ME":
            return {...state, isInitialized:action.value}
        case "UPDATE-USER":
            return {...state, updatedUser:action.name}
        case "GET-USER":
            return {...state, user: action.userData}
        case "SET-PASS":
            return {...state, isUpdated:action.value}
        default:
            return state
    }
}
export const getLoginAC = (value:boolean) =>{
    return{
        type:'GET-LOGIN',
        value
    }as const
}
export const registerNewUser = (newData:boolean) => {
    return{
        type:'NEW-USER',
        newData
    }as const
}
export const getMe = (value:boolean) => {
    return{
        type:'GET-ME',
        value
    }as const
}
export const getUpdatedUser = (name:string) => {
    return{
        type:'UPDATE-USER',
        name
    }as const
}
export const getUser = (userData:userType) => {
    return{
        type:'GET-USER',
        userData
    }as const
}
export const forgotPass = (value:boolean) => {
    return{
        type:'FORGOT-PASS',
        value
    }as const
}
export const setPass = (value:boolean) => {
    return{
        type:'SET-PASS',
        value
    } as const
}
export const getLoginTC = (email:string,pass:string, rememberMe:boolean) => (dispatch:Dispatch) => {
    authAPI.login(email,pass,rememberMe).then((res)=>{
        dispatch(getLoginAC(true))
    })
        .catch((e)=>{
            const error = e.response? e.response.data.error:
                (e.message+',more details in the console')
            console.log('Error: ', {...e})
        })
}
export const getRegisterTC = ((email:string, password:string) => (dispatch:Dispatch) =>{
    authAPI.register(email,password).then((res)=>{
            dispatch(registerNewUser(true))
    })
        .catch((e)=>{
        const error = e.response? e.response.data.error:
            (e.message+',more details in the console')
            console.log('Error: ', {...e})
    })
})
export const authMe = (() => (dispatch:Dispatch) =>{
    authAPI.me().then((res)=>{
        dispatch(getLoginAC(true))
        dispatch(getUser(res.data))
    })
        .catch((e)=>{
            const error = e.response? e.response.data.error:
                (e.message+',more details in the console')
            console.log('Error: ', {...e})
        })
        .finally(()=>{
            dispatch(getMe(true))
        })
})

export const UpdatedUserTC = ((name:string) => (dispatch:Dispatch) =>{
    authAPI.updateUser(name).then((res)=>{
        dispatch(getUpdatedUser(name))
    })
        .catch((e)=>{
            const error = e.response? e.response.data.error:
                (e.message+',more details in the console')
            console.log('Error: ', {...e})
        })
})
export const logOutTC = (() => (dispatch:Dispatch) =>{
    authAPI.logOut().then((res)=>{
        dispatch(getLoginAC(false))
    })
        .catch((e)=>{
            const error = e.response? e.response.data.error:
                (e.message+',more details in the console')
            console.log('Error: ', {...e})
        })
})
export const getUserProfile = (() => (dispatch:Dispatch) =>{
    authAPI.me().then((res)=>{
        dispatch(getUser(res.data))
    })
        .catch((e)=>{
            const error = e.response? e.response.data.error:
                (e.message+',more details in the console')
            console.log('Error: ', {...e})
        })
})
export const forgotPassTC = (email:string,from:string, message:string) => (dispatch:Dispatch) =>{
    authAPI.forgot(email,from,message).then((res)=>{
        dispatch(forgotPass(true))
    })
}
export const setPassTC = (pass:string, token:string) => (dispatch:Dispatch) =>{
    authAPI.setPassword(pass,token).then((res)=>{
        dispatch(setPass(true))
    })
}
type ActionType = getLoginACType|registerNewUserType|getMeType|UpdatedUserType|getUserType|forgotPassType|setPassType
type getLoginACType = ReturnType<typeof getLoginAC>
type getMeType = ReturnType<typeof getMe>
type setPassType = ReturnType<typeof setPass>
type forgotPassType = ReturnType<typeof forgotPass>
type getUserType = ReturnType<typeof getUser>
type registerNewUserType = ReturnType<typeof registerNewUser>
type UpdatedUserType = ReturnType<typeof getUpdatedUser>