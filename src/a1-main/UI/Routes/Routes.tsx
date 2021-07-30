import React from 'react'
import {Redirect, Route, Switch } from "react-router-dom"
import Profile from "../../../b1/features/profile/Profile";
import Login from "../../../b1/features/auth/Login";
import Register from "../../../b1/features/auth/Register";
import Errors from "../../../b1/features/errors/Errors";
import Password from "../../../b1/features/pass/Password";
import SetPassword from "../../../b1/features/pass/SetPassword";

export const PATH = {
    login:'/login',
    register:'/register',
    profile:'/profile',
    error:'/404',
    renew:'/renew',
    setPassword:'/set-pass/:token'
}

const Routes = () =>{

    return(
        <div>
            <Switch>
                <Route path={'/'} exact component={Profile}/>
                <Route path={PATH.profile} component={Profile}/>
                <Route path={PATH.login} component={Login}/>
                <Route path={PATH.register} component={Register}/>
                <Route path={PATH.error} component={Errors}/>
                <Route path={PATH.renew} component={Password}/>
                <Route path={PATH.setPassword} component={SetPassword}/>
                <Route path={'/404'} render={() => <h1>404:PAGE NOT FOUND</h1>} />
                <Redirect from={"*"} to={PATH.error} />
            </Switch>
        </div>
    )
}
export default Routes