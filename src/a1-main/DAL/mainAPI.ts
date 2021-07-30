import axios from "axios";

export const instance = axios.create({
    baseURL:'https://neko-back.herokuapp.com/2.0/',
    withCredentials:true,
})

export const authAPI = {
    login(email:string, password:string, rememberMe:boolean){
        return instance.post<any>('auth/login', {email,password,rememberMe})
    },
    register(email:string, password:string){
        return instance.post<ResponseNewUserType>('auth/register',{email,password})
    },
    me(){
        return instance.post<userType>('auth/me')
    },
    updateUser(name:string){
        return instance.put<ResponseUpdatedUserType>('auth/me', {name})
    },
    logOut(){
        return instance.delete('auth/me')
    },
    forgot(email:string,from:string, message:string){
        return instance.post('auth/forgot',{email,from,message})
    },
    setPassword(password:string, resetPasswordToken:string){
        return instance.post<ResponseSetPasswordType>('auth/set-new-password',{password,resetPasswordToken})
    }
}
export type LoginRequestType = {
    id:string;
    email:string;
    name:string;
    avatar:string;
    publicCardPacksCount:number;
    created:Date;
    updated:Date;
    isAdmin:boolean;
    verified:boolean;
    rememberMe:boolean;
}
export type ResponseNewUserType = {
    addedUser:{},
    error?:string
}
export type ResponseUpdatedUserType = {
    updatedUser:{},
    error?:string
}
export type ResponseSetPasswordType = {
    info:string,
    error:string
}
export type userType = {
    _id: string
    email: string
    name: string
    avatar: string
    error?: string
}