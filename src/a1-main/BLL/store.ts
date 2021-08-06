import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {authReducer} from "./authReducer";
import {configureStore} from "@reduxjs/toolkit";
import {packReducer} from "./packReducer";
import {cardReducer} from "./cardReducer";

const rootReducer = combineReducers({
    auth:authReducer,
    packs:packReducer,
    cards:cardReducer
})
export const store = configureStore({
    reducer:rootReducer,
    middleware:getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)

})
export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store

