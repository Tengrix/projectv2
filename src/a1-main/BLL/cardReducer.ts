import {createAsyncThunk, createSlice, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit";
import {cardAPI, cardType, createCardType, getCardResponseType, GetCardsModuleType} from "../DAL/mainAPI";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppStatusAC} from "./authReducer";
export type sortCardsType = '0grade'|'1grade'|'0shots'|'1shots'
export type cardInitialStateType = {
    cards:cardType[]
    cardsTotalCount:number;
    maxGrade:number;
    minGrade:number;
    page:number;
    currentPortionToPaginator:number;
    pageCount:number;
    packUserId:string;
    sortCards:sortCardsType;
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

export const getCardsTC = createAsyncThunk('cards/getCards', async (packId:string, thunkAPI)=>{
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    let state = thunkAPI.getState() as AppRootStateType
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
    try{
        const res = await cardAPI.getCards(state.cards.learningMode?learnMode:cardData)
        thunkAPI.dispatch(getCards({cardData:res.data}))
        thunkAPI.dispatch(setAppStatusAC({status:'succeeded'}))
    }catch (e){
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }

})
export const createCardTC = createAsyncThunk('cards/createCard', async (params:{packId:string,question:string, answer:string}, thunkAPI)=>{
    let state = thunkAPI.getState() as AppRootStateType
    let getNewCard:createCardType = {
        _id:state.auth.user._id,
        cardsPack_id:params.packId,
        grade:0,
        shots:0,
        answer:params.answer,
        question:params.question
    }
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    try {
        const res = await cardAPI.createCard(getNewCard)
        thunkAPI.dispatch(getCardsTC(params.packId))
        thunkAPI.dispatch(setAppStatusAC({status:'succeeded'}))
    }catch (e){
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }
})
export const delCardTC = createAsyncThunk('cards/delCard', async (id:string, thunkAPI)=>{
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    try{
        const res = await cardAPI.deleteCard(id)
        thunkAPI.dispatch(setAppStatusAC({status:'succeeded'}))
    }catch (e){
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }
})
export const updCardTC = createAsyncThunk('cards/updCard', async (params:{id:string,question:string,answer:string,packId:string}, thunkAPI)=>{
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    try{
        const res = await cardAPI.updateCard(params.id,params.question,params.answer)
        thunkAPI.dispatch(getCardsTC(params.packId))
        thunkAPI.dispatch(setAppStatusAC({status:'succeeded'}))
    }catch (e){
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }

})
export const getGradeTC = createAsyncThunk('cards/getGrade', async (params:{grade:number,id:string,packId:string}, thunkAPI)=>{
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    try {
        const res = await cardAPI.getGrade(params.grade, params.id)
        thunkAPI.dispatch(getCardsTC(params.packId))
        thunkAPI.dispatch(setAppStatusAC({status:'succeeded'}))
    }catch (e){
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }
})


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
        sortCards(state,action:PayloadAction<{value:sortCardsType}>){
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

