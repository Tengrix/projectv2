import {cardReducer, getCards, newCard, sortCards} from "./cardReducer";
import {cardType} from "../DAL/mainAPI";
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
const state:initialStateType = {
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

test('sortCards',()=>{
    let action = sortCards({value:'0grade'})
    let newState = cardReducer(state,action)
    expect(newState.sortCards).toBe('0grade')
})
test('updateCard',()=>{
    let action = newCard({value:true})
    let newState = cardReducer(state,action)
    expect(newState.newCardCreated).toBe(true)
})