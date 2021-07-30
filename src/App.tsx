import React, {useEffect} from 'react';
import Header from './a1-main/UI/Header/Header';
import './App.css';
import {HashRouter, Redirect} from "react-router-dom";
import Routes, {PATH} from "./a1-main/UI/Routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./a1-main/BLL/store";
import {authMe, logOutTC} from "./a1-main/BLL/authReducer";

function App() {
    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.auth.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state =>state.auth.isLoggedIn )
    const onClickLog = () => {
        dispatch(logOutTC())
    }
    useEffect(()=>{
        dispatch(authMe())
    },[dispatch])

    if(!isInitialized){
        return <div>loading</div>
    }
  return (
    <div>
        <HashRouter>
            {!isLoggedIn ? <Redirect to={PATH.login}/> : <button onClick={onClickLog}>logout</button>}
            <Header/>
            <Routes/>
        </HashRouter>
    </div>
  );
}

export default App;
