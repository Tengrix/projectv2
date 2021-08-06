import {createSlice, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit";
import {cardAPI, cardType, createCardType, getCardResponseType, GetCardsModuleType} from "../DAL/mainAPI";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
type initialStateType = {
    cards:cardType[]
    cardsTotalCount:number;
    maxGrade:number;
    minGrade:number;
    page:number;
    pageCount:number;
    packUserId:string;
    sortCards:'0grade'|'1grade'|'0shot'|'1shot';
    newCardCreated:boolean;
}
const initialState:initialStateType = {
    cards:[],
    cardsTotalCount:3,
    maxGrade:5,
    minGrade:1,
    page:1,
    pageCount:10,
    packUserId:'',
    sortCards:'0grade',
    newCardCreated:false
}
const slice = createSlice({
    name:'cardReducer',
    initialState: initialState,
    reducers:{
        getCards(state,action:PayloadAction<{cardData:getCardResponseType}>){
            state.cards = action.payload.cardData.cards
            state.page = action.payload.cardData.page
            state.pageCount = action.payload.cardData.pageCount
            state.packUserId = action.payload.cardData.packUserId
            state.cardsTotalCount = action.payload.cardData.cardsTotalCount
            state.maxGrade = action.payload.cardData.maxGrade
            state.minGrade = action.payload.cardData.minGrade
        },
        sortCards(state,action:PayloadAction<{value:'0grade'|'1grade'|'0shot'|'1shot'}>){
            state.sortCards = action.payload.value
        },
        newCard(state,action:PayloadAction<{value:boolean}>){
            state.newCardCreated = action.payload.value
        }
    }
})
export const {getCards,sortCards,newCard} = slice.actions
export const cardReducer = slice.reducer

export const getCardsTC = (packId:string) => (dispatch:Dispatch,getState:()=>AppRootStateType) =>{
    let state = getState()
    const cardData:GetCardsModuleType = {
        params:{
            min:state.cards.minGrade,
            max:state.cards.maxGrade,
            page:state.cards.page,
            sortCards:state.cards.sortCards,
            pageCount:state.cards.pageCount,
            cardsPack_id:packId
        }
    }
    cardAPI.getCards(cardData).then((res)=>{
        dispatch(getCards({cardData:res.data}))
    })
}
export const createCardTC = (packId:string) => (dispatch:ThunkDispatch<void,AppRootStateType,any>, getState:()=>AppRootStateType) =>{
    let state = getState()
    let getNewCard:createCardType = {
            _id:state.auth.user._id,
            cardsPack_id:packId,
            grade:0,
            shots:0,
            answer:'no answer',
            question:'no question'
    }
    cardAPI.createCard(getNewCard).then((res)=>{
        dispatch(getCardsTC(packId))
    })
}
export const delCardTC = (id:string) => () =>{
    cardAPI.deleteCard(id).then(()=>{
    })
}
export const updCardTC = (id:string,question:string,packId:string) => (dispatch:ThunkDispatch<void,AppRootStateType,any>, getState:()=>AppRootStateType) => {
    cardAPI.updateCard(id,question).then(()=>{
        dispatch(getCardsTC(packId))
    })
}