import {createSlice, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit";
import {
    cardPacksType,
    getCardsPackResponseType,
    GetCardsPacksModuleType,
    packAPI
} from "../DAL/mainAPI";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppStatusAC} from "./authReducer";
export type initialStateType = {
    cardPacks:cardPacksType[];
    myCardsPack:boolean;
    isDeleted:boolean;
    cardPacksTotalCount:number;
    maxCardsCount:number;
    minCardsCount:number;
    page:number;
    pageCount:number;
    sortCardsPacks:"0name" | "1name" | "0cardsCount" | "1cardsCount"|'1updated'|'0updated'|'0created'|'1created';
    user_id:string;
    newPageForShow: number,
    currentPortionToPaginator: number,
    newCardsPack:{
        name:string
    },
    updatedCardsPack:{
        name:string
    }
}
const initialState:initialStateType = {
    cardPacks:[],
    myCardsPack:false,
    isDeleted:false,
    cardPacksTotalCount:14,
    maxCardsCount:103,
    minCardsCount:0,
    page:1,
    pageCount:10,
    newPageForShow: 1,
    currentPortionToPaginator: 1,
    sortCardsPacks: "0cardsCount",
    user_id:'',
    newCardsPack:{
        name:''
    },
    updatedCardsPack:{
        name:''
    }
}

const slice = createSlice({
    name:'packReducer',
    initialState:initialState,
    reducers:{
        getPacks(state, action:PayloadAction<{packsData:getCardsPackResponseType}>){
            state.cardPacks = action.payload.packsData.cardPacks
            state.cardPacksTotalCount = action.payload.packsData.cardPacksTotalCount
            state.page = action.payload.packsData.page
            state.maxCardsCount = action.payload.packsData.maxCardsCount
            state.pageCount = action.payload.packsData.pageCount
            state.minCardsCount = action.payload.packsData.minCardsCount
        },
        getNewPack(state,action:PayloadAction<{ name: string }>){
            state.newCardsPack.name = action.payload.name
        },
        changeSort(state, action:PayloadAction<{newSort:"0name" | "1name" | "0cardsCount" | "1cardsCount"|'1updated'|'0updated'|'0created'|'1created'}>){
            state.sortCardsPacks = action.payload.newSort
        },
        checkMyPack(state,action:PayloadAction<{value:boolean}>){
            state.myCardsPack = action.payload.value
        },
        delPacks(state,action:PayloadAction<{value:boolean}>){
            state.isDeleted = action.payload.value
        },
        updatePackName(state,action:PayloadAction<{name:string}>){
            state.updatedCardsPack.name = action.payload.name
        },
        setNewPage(state,action:PayloadAction<{newShowPage:number}>){
            state.page = action.payload.newShowPage
        },
        setNewPortion(state,action:PayloadAction<{currentPortion:number}>){
            state.currentPortionToPaginator = action.payload.currentPortion
        }
    }
})
export const {getPacks,getNewPack,changeSort,checkMyPack,delPacks,updatePackName,setNewPage,setNewPortion} = slice.actions
export const packReducer = slice.reducer

export const getPacksTC = () => (dispatch:Dispatch, getState:()=>AppRootStateType) =>{
    dispatch(setAppStatusAC({status:'loading'}))
    const state = getState()
    const packData:GetCardsPacksModuleType = {
        params:{
            page:state.packs.page,
            max:state.packs.maxCardsCount,
            pageCount:state.packs.pageCount,
            min:state.packs.minCardsCount,
            sortPacks:state.packs.sortCardsPacks,
            user_id:state.packs.user_id,
            cardPacksTotalCount:state.packs.cardPacksTotalCount
        }
    }
    if(state.packs.myCardsPack){
        packData.params.user_id = state.auth.user._id
    }
    packAPI.cardsPack(packData).then(res=>{
        dispatch(getPacks({packsData:res.data}))
        dispatch(setAppStatusAC({status:'succeeded'}))
    })
}
export const createNewPack = (name:string) => (dispatch:ThunkDispatch<void,AppRootStateType,any>)=>{
    dispatch(setAppStatusAC({status:'loading'}))
    packAPI.createPack(name).then(res=>{
        dispatch(getPacksTC())
        dispatch(setAppStatusAC({status:'succeeded'}))
    })
}
export const delPack = (id:string) => (dispatch:ThunkDispatch<void,AppRootStateType,any>) =>{
    dispatch(setAppStatusAC({status:'loading'}))
    packAPI.deletePack(id).then(()=>{
        dispatch(delPacks({value:true}))
        dispatch(getPacksTC())
        dispatch(setAppStatusAC({status:'succeeded'}))
    })
}
export const updatePack = (id:string, name:string) => (dispatch:ThunkDispatch<void,AppRootStateType,any>) =>{
    dispatch(setAppStatusAC({status:'loading'}))
    packAPI.updatePack(id,name).then((res)=>{
        dispatch(getPacksTC())
        dispatch(setAppStatusAC({status:'succeeded'}))
    })
}