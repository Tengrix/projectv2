import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {authReducer} from "./authReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    auth:authReducer
})
export const store = configureStore({
    reducer:rootReducer,
    middleware:getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)

})
export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store

