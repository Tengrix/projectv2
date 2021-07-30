import {
    authReducer, forgotPass,
    getLoginAC,
    getMe,
    getUpdatedUser,
    getUser,
    registerNewUser,
    setPass
} from "./authReducer";

const state = {
    isLoggedIn: false,
    isRegistered:false,
    isInitialized:false,
    user: {
        _id: "",
        email: "",
        name: "",
        avatar: "",
    },
    updatedUser:{    },
    isPassUpdated:false,
    isPassSet:false,
}
test('isLoggedIn should be true',()=>{
    let action = getLoginAC({value:true})
    let newState = authReducer(state, action)
    expect(newState.isLoggedIn).toBe(true)
})
test('isRegistered should be true', ()=>{
    let action = registerNewUser({value:true})
    let newState = authReducer(state, action)
    expect(newState.isRegistered).toBe(true)
})
test('isInitialized should be true',()=>{
    let action = getMe({value:true})
    let newState = authReducer(state, action)
    expect(newState.isInitialized).toBe(true)
})
test('Get new name of User',()=>{
    let action = getUpdatedUser({name:'Damir'})
    let newState = authReducer(state, action)
    expect(newState.updatedUser).toBe('Damir')
})
test('get new User',()=>{
    let action = getUser({user: {name: 'Damir', email: 'damir861@gmail.com', avatar: '', _id: '123'}})
    let newState = authReducer(state, action)
    expect(newState.user.email).toEqual('damir861@gmail.com')
})
test('pass should be updated',()=>{
    let action = forgotPass({value:true})
    let newState = authReducer(state,action)
    expect(newState.isPassUpdated).toBe(true)
})
test('updatedPass should be true',()=>{
    let action = setPass({value: true})
    let newState = authReducer(state, action)
    expect(newState.isPassSet).toBe(true)
})