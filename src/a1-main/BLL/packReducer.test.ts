import {changeSort, checkMyPack, delPacks, getNewPack, packReducer, updatePackName} from "./packReducer";
import {cardPacksType} from "../DAL/mainAPI";
type initialStateType = {
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
    newCardsPack:{
        name:string
    },
    updatedCardsPack:{
        name:string
    }
}
const state:initialStateType = {
    cardPacks:[],
    myCardsPack:false,
    isDeleted:false,
    cardPacksTotalCount:14,
    maxCardsCount:1,
    minCardsCount:0,
    page:1,
    pageCount:10,
    sortCardsPacks: "0cardsCount",
    user_id:'',
    newCardsPack:{
        name:''
    },
    updatedCardsPack:{
        name:''
    }
}
test('testNewName', ()=>{
    let action = getNewPack({name:'Damir'})
    let newState = packReducer(state, action)
    expect(newState.newCardsPack.name).toEqual('Damir')
})
test('testSort', ()=>{
    let action = changeSort({newSort:'0name'})
    let newState = packReducer(state, action)
    expect(newState.sortCardsPacks).toBe('0name')
})
test('testMyPack',()=>{
    let action = checkMyPack({value:true})
    let newState = packReducer(state,action)
    expect(newState.myCardsPack).toBe(true)
})
test('testDeletePack',()=>{
    let action = delPacks({value:true})
    let newState = packReducer(state,action)
    expect(newState.isDeleted).toBe(true)
})
test('',()=>{
    let action = updatePackName({name:'Damir'})
    let newState = packReducer(state, action)
    expect(newState.updatedCardsPack.name).toBe('Damir')
})