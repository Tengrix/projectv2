import {authAPI, userType} from "../DAL/mainAPI";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AuthInitialStateType = {
    isLoggedIn: boolean;
    isRegistered: boolean;
    isInitialized: boolean;
    user: userType
    updatedUser: {},
    isPassUpdated: boolean,
    isPassSet: boolean,
    status: RequestStatusType
}
const initialState: AuthInitialStateType = {
    isLoggedIn: false,
    isRegistered: false,
    isInitialized: false,
    user: {
        _id: "",
        email: "",
        name: "",
        avatar: "",
    },
    updatedUser: {},
    isPassUpdated: false,
    isPassSet: false,
    status: 'idle'
}

export const getLoginTC = createAsyncThunk('auth/login', async (params: { email: string, password: string, rememberMe: boolean }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(params.email, params.password, params.rememberMe)
        const {_id, name, email, avatar} = res.data
        thunkAPI.dispatch(getLoginAC({value: true}))
        thunkAPI.dispatch(getUser({user: {_id, name, email, avatar}}))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e) {
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }
})
export const getRegisterTC = createAsyncThunk('auth/register', async (param: { email: string, password: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.register(param.email, param.password)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {value: true}
    } catch (e) {
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }
})
export const authMe = createAsyncThunk('auth/authMe', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.me()
        thunkAPI.dispatch(getLoginAC({value: true}))
        thunkAPI.dispatch(getUser({user: res.data}))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e) {
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }
    thunkAPI.dispatch(getMe({value: true}))
})
export const UpdatedUserTC = createAsyncThunk('auth/updateUser', async (name: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.updateUser(name)
        thunkAPI.dispatch(getUpdatedUser({name}))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e) {
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }
})
export const logOutTC = createAsyncThunk('auth/logout', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logOut()
        thunkAPI.dispatch(getLoginAC({value: false}))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e) {
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }
})
export const getUserProfile = createAsyncThunk('auth/profile', async (arg, thunkAPI) => {
    try {
        const res = await authAPI.me()
        const {_id, name, email, avatar} = res.data
        thunkAPI.dispatch(getUser({user: {_id, name, email, avatar}}))
    } catch (e) {
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }
})
export const forgotPassTC = createAsyncThunk('auth/getNewPass', async (params: { email: string, from: string, message: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.forgot(params.email, params.from, params.message)
        thunkAPI.dispatch(forgotPass({value: true}))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e) {
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }
})
export const setPassTC = createAsyncThunk('auth/setPass', async (params: { password: string, token: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.setPassword(params.password, params.token)
        thunkAPI.dispatch(setPass({value: true}))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e) {
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }
})

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        getLoginAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        },
        registerNewUser(state, action: PayloadAction<{ value: boolean }>) {
            state.isRegistered = action.payload.value
        },
        getMe(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value
        },
        getUpdatedUser(state, action: PayloadAction<{ name: string }>) {
            state.updatedUser = action.payload.name
        },
        getUser(state, action: PayloadAction<{ user: userType }>) {
            state.user = action.payload.user
        },
        forgotPass(state, action: PayloadAction<{ value: boolean }>) {
            state.isPassUpdated = action.payload.value
        },
        setPass(state, action: PayloadAction<{ value: boolean }>) {
            state.isPassSet = action.payload.value
        },
        setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        }
    }
})
export const {
    getLoginAC,
    registerNewUser,
    getMe,
    getUpdatedUser,
    getUser,
    forgotPass,
    setPass,
    setAppStatusAC
} = slice.actions
export const authReducer = slice.reducer

