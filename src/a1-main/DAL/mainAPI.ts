import axios from "axios";

export const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true,
})

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<userType>('auth/login', {email, password, rememberMe})
    },
    register(email: string, password: string) {
        return instance.post<ResponseNewUserType>('auth/register', {email, password})
    },
    me() {
        return instance.post<userType>('auth/me')
    },
    updateUser(name: string) {
        return instance.put<ResponseUpdatedUserType>('auth/me', {name})
    },
    logOut() {
        return instance.delete('auth/me')
    },
    forgot(email: string, from: string, message: string) {
        return instance.post('auth/forgot', {email, from, message})
    },
    setPassword(password: string, resetPasswordToken: string) {
        return instance.post<ResponseSetPasswordType>('auth/set-new-password', {password, resetPasswordToken})
    }
}
export const packAPI = {
    cardsPack(packData: GetCardsPacksModuleType) {
        return instance.get<getCardsPackResponseType>('cards/pack', packData)
    },
    createPack(name: string) {
        return instance.post<cardPacksType>('cards/pack', {cardsPack: {name: name}})
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack/?id=${id}`)
    },
    updatePack(_id: string, name: string) {
        return instance.put('cards/pack', {cardsPack: {_id: _id, name: name}})
    }
}
export const cardAPI = {
    getCards(cardData: GetCardsModuleType) {
        return instance.get<getCardResponseType>('cards/card', cardData)
    },
    createCard(card: createCardType) {
        return instance.post('cards/card', {card})
    },
    deleteCard(id:string){
        return instance.delete(`cards/card?id=${id}`)
    },
    updateCard(_id:string,question:string){
        return instance.put('cards/card',{card: {_id,question}})
    }
}
export type createCardType = {
    _id: string;
    cardsPack_id: string;
    question: string;
    answer: string;
    grade: number;
    shots: number;
}
export type GetCardsModuleType = {
    params: {
        cardAnswer?: string;
        cardQuestion?: string;
        cardsPack_id?: string;
        min?: number;
        max?: number;
        sortCards?: '0grade' | '1grade' | '0shot' | '1shot'
        page?: number;
        pageCount?: number;
    }
}
export type getCardResponseType = {
    cards: cardType[]
    cardsTotalCount: number;
    maxGrade: number;
    minGrade: number;
    page: number;
    pageCount: number;
    packUserId: string;
}
export type cardType = {
    answer: string;
    question: string;
    cardsPack_id: string;
    grade: number;
    shots: number;
    user_id: string;
    created: string,
    updated: string,
    _id: string

}
export type GetCardsPacksModuleType = {
    params: {
        min?: number
        max?: number
        sortPacks?: "0name" | "1name" | "0cardsCount" | "1cardsCount" | '1updated' | '0updated' | '0created' | '1created'
        page?: number
        pageCount?: number
        user_id: string
        cardPacksTotalCount:number
    }
}
export type cardPacksType = {
    _id: string;
    user_id: string;
    name: string;
    cardsCount: number;
    created: string;
    updated: string;
}
export type getCardsPackResponseType = {
    cardPacks: cardPacksType[]
    cardPacksTotalCount: number;
    maxCardsCount: number;
    minCardsCount: number;
    page: number;
    pageCount: number;
}
export type ResponseNewUserType = {
    addedUser: {},
    error?: string
}
export type ResponseUpdatedUserType = {
    updatedUser: {},
    error?: string
}
export type ResponseSetPasswordType = {
    info: string,
    error: string
}
export type userType = {
    _id: string
    email: string
    name: string
    avatar: string
    error?: string
}