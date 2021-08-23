import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {cardPacksType, getCardsPackResponseType, GetCardsPacksModuleType, packAPI} from "../DAL/mainAPI";
import {AuthInitialStateType, setAppStatusAC} from "./authReducer";

export type PackSortType =
      "0name"
    | "1name"
    | "0cardsCount"
    | "1cardsCount"
    | '1updated'
    | '0updated'
    | '0created'
    | '1created'
export type initialStateType = {
    cardPacks: cardPacksType[];
    myCardsPack: boolean;
    isDeleted: boolean;
    cardPacksTotalCount: number;
    maxCardsCount: number;
    minCardsCount: number;
    page: number;
    pageCount: number;
    sortCardsPacks: PackSortType;
    user_id: string;
    newPageForShow: number,
    currentPortionToPaginator: number,
    newCardsPack: {
        name: string
    },
    updatedCardsPack: {
        name: string
    }
}
const initialState: initialStateType = {
    cardPacks: [],
    myCardsPack: false,
    isDeleted: false,
    cardPacksTotalCount: 14,
    maxCardsCount: 103,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    newPageForShow: 1,
    currentPortionToPaginator: 1,
    sortCardsPacks: "0cardsCount",
    user_id: '',
    newCardsPack: {
        name: ''
    },
    updatedCardsPack: {
        name: ''
    }
}

export const getPacksTC = createAsyncThunk('packs/getPack', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const {auth} = thunkAPI.getState() as { auth: AuthInitialStateType }
    const {packs} = thunkAPI.getState() as { packs: initialStateType }
    const packData: GetCardsPacksModuleType = {
        params: {
            page: packs.page,
            pageCount: packs.pageCount,
            sortPacks: packs.sortCardsPacks,
            user_id: packs.user_id,
            cardPacksTotalCount: packs.cardPacksTotalCount
        }
    }
    if (packs.myCardsPack) {
        packData.params.user_id = auth.user._id
    }
    try {
        const res = await packAPI.cardsPack(packData)
        thunkAPI.dispatch(getPacks({packsData: res.data}))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e){
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }
})
export const createNewPack = createAsyncThunk('packs/createNewPack', async (name: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await packAPI.createPack(name)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        thunkAPI.dispatch(getPacksTC())
        return
    } catch (e){
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }
})
export const delPack = createAsyncThunk('packs/del', async (id: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await packAPI.deletePack(id)
        thunkAPI.dispatch(getPacksTC())
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (e){
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }
})
export const updatePack = createAsyncThunk('packs/updatePack', async (params: { id: string, name: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await packAPI.updatePack(params.id, params.name)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        thunkAPI.dispatch(getPacksTC())
    } catch (e){
        const error = e.response ? e.response.data.error :
            (e.message + ',more details in the console')
        console.log('Error: ', {...e})
    }
})
const slice = createSlice({
    name: 'packReducer',
    initialState: initialState,
    reducers: {
        getPacks(state, action: PayloadAction<{ packsData: getCardsPackResponseType }>) {
            state.cardPacks = action.payload.packsData.cardPacks
            state.cardPacksTotalCount = action.payload.packsData.cardPacksTotalCount
            state.page = action.payload.packsData.page
            state.maxCardsCount = action.payload.packsData.maxCardsCount
            state.pageCount = action.payload.packsData.pageCount
            state.minCardsCount = action.payload.packsData.minCardsCount
        },
        getNewPack(state, action: PayloadAction<{ name: string }>) {
            state.newCardsPack.name = action.payload.name
        },
        changeSort(state, action: PayloadAction<{ newSort: PackSortType }>) {
            state.sortCardsPacks = action.payload.newSort
        },
        checkMyPack(state, action: PayloadAction<{ value: boolean }>) {
            state.myCardsPack = action.payload.value
        },
        delPacks(state, action: PayloadAction<{ value: boolean }>) {
            state.isDeleted = action.payload.value
        },
        updatePackName(state, action: PayloadAction<{ name: string }>) {
            state.updatedCardsPack.name = action.payload.name
        },
        setNewPage(state, action: PayloadAction<{ newShowPage: number }>) {
            state.page = action.payload.newShowPage
        },
        setNewPortion(state, action: PayloadAction<{ currentPortion: number }>) {
            state.currentPortionToPaginator = action.payload.currentPortion
        }
    }
})
export const {
    getPacks,
    getNewPack,
    changeSort,
    checkMyPack,
    delPacks,
    updatePackName,
    setNewPage,
    setNewPortion
} = slice.actions
export const packReducer = slice.reducer

