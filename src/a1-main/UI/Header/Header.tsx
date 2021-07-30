import React from 'react'
import { NavLink } from "react-router-dom"
import { PATH } from '../Routes/Routes'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../BLL/store";


const Header = () =>{
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state => state.auth.isLoggedIn)
    return(
        <div>
            { isLoggedIn &&
                <nav>
                    <span><NavLink to={PATH.profile} replace>Profile</NavLink></span>
                    <span><NavLink to={PATH.login} replace>Login</NavLink></span>
                    <span><NavLink to={PATH.register} replace>Register</NavLink></span>
                    <span><NavLink to={PATH.renew} replace>renew pass</NavLink></span>
                    <span><NavLink to={PATH.setPassword} replace>set new pass</NavLink></span>
                </nav>
            }
        </div>
    )
}
export default Header