import {createSlice, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit";
import {cardAPI, cardType, createCardType, getCardResponseType, GetCardsModuleType} from "../DAL/mainAPI";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
export type cardInitialStateType = {
    cards:cardType[]
    cardsTotalCount:number;
    maxGrade:number;
    minGrade:number;
    page:number;
    currentPortionToPaginator:number;
    pageCount:number;
    packUserId:string;
    sortCards:'0grade'|'1grade'|'0shots'|'1shots';
    newCardCreated:{
        answer:string,
        question:string
    }
    search: {
        answer:string,
        question:string
    }
    updatedGrade:{
        grade:number,
    },
    learningMode:boolean;
}
const initialState:cardInitialStateType = {
    cards:[],
    cardsTotalCount:3,
    maxGrade:5,
    minGrade:1,
    page:1,
    pageCount:10,
    currentPortionToPaginator:1,
    packUserId:'',
    sortCards:'0grade',
    newCardCreated:{
        answer:'',
        question:''
    },
    search: {
        answer:'',
        question:''
    },
    updatedGrade:{
        grade:0,
    },
    learningMode:false
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
        sortCards(state,action:PayloadAction<{value:'0grade'|'1grade'|'0shots'|'1shots'}>){
            state.sortCards = action.payload.value
        },
        newCard(state,action:PayloadAction<{question:string, answer:string}>){
            state.newCardCreated.answer = action.payload.answer
            state.newCardCreated.question = action.payload.question
        },
        setSearchQuestion(state,action:PayloadAction<{keyWordForQuestion:string, keyWordForAnswer:string}>){
            state.search.question = action.payload.keyWordForQuestion
            state.search.answer = action.payload.keyWordForAnswer
        },
        setNewCardsPage(state,action:PayloadAction<{newShowPage:number}>){
            state.page = action.payload.newShowPage
        },
        setNewCardsPortion(state,action:PayloadAction<{currentPortion:number}>){
            state.currentPortionToPaginator = action.payload.currentPortion
        },
        setLearningModeOn(state,action:PayloadAction<{modeOn:boolean}>){
            state.learningMode = action.payload.modeOn
        }
    }
})
export const {getCards,sortCards,newCard,setSearchQuestion,setNewCardsPortion,setNewCardsPage,setLearningModeOn} = slice.actions
export const cardReducer = slice.reducer

export const getCardsTC = (packId:string) => (dispatch:Dispatch,getState:()=>AppRootStateType) =>{
    let state = getState()
    const cardData:GetCardsModuleType = {
        params:{
            page:state.cards.page,
            sortCards:state.cards.sortCards,
            pageCount:state.cards.pageCount,
            cardsPack_id:packId,
            cardQuestion:state.cards.search.question,
            cardAnswer:state.cards.search.answer,
        }
    }
    const learnMode:GetCardsModuleType ={
        params:{
            cardsPack_id:packId,
            pageCount:state.cards.cardsTotalCount
        }
    }
    cardAPI.getCards(state.cards.learningMode?learnMode:cardData).then((res)=>{
        dispatch(getCards({cardData:res.data}))
    })
}
export const createCardTC = (packId:string,question:string, answer:string) => (dispatch:ThunkDispatch<void,AppRootStateType,any>, getState:()=>AppRootStateType) =>{
    let state = getState()
    let getNewCard:createCardType = {
            _id:state.auth.user._id,
            cardsPack_id:packId,
            grade:0,
            shots:0,
            answer:answer,
            question:question
    }
    cardAPI.createCard(getNewCard).then((res)=>{
        dispatch(getCardsTC(packId))
    })
}
export const delCardTC = (id:string) => () =>{
    cardAPI.deleteCard(id).then(()=>{
    })
}
export const updCardTC = (id:string,question:string,answer:string,packId:string) => (dispatch:ThunkDispatch<void,AppRootStateType,any>) => {
    cardAPI.updateCard(id,question,answer).then(()=>{
        dispatch(getCardsTC(packId))
    })
}
export const getGradeTC = (grade:number,id:string,packId:string) => (dispatch:ThunkDispatch<void,AppRootStateType,any>) =>{
    cardAPI.getGrade(grade, id).then(()=>{
        dispatch(getCardsTC(packId))
    })
}