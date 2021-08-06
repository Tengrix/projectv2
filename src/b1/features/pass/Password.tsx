import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {forgotPassTC} from "../../../a1-main/BLL/authReducer";
import {useFormik} from "formik";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../a1-main/UI/Routes/Routes";
import {AppRootStateType} from "../../../a1-main/BLL/store";
type FormikErrorType = {
    email?: string
}
const Password = () =>{
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const fromEmail ='nya-admin@nya.nya'
    const msg = `<div style="background-color: lime; padding: 15px">error: string;password recovery link:<a href='http://tengrix.github.io/projectv2/#/set-pass/$token$'>link</a></div>`
        const formik = useFormik({
        initialValues:{
            email:''
        },
        validate:(values)=>{
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
        },
        onSubmit:values => {
            dispatch(forgotPassTC(values.email, fromEmail,msg))
            formik.resetForm()
        }
    })
    if (!isLoggedIn) {
        return <Redirect to={PATH.login}/>
    }

    return(
        <div>
            <form onSubmit={formik.handleSubmit} action="">
                <input type={'email'} placeholder={'email'} {...formik.getFieldProps('email')} />
                {formik.touched.email&& formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                <button type={'submit'}>Submit</button>
            </form>
        </div>
    )
}
export default Password