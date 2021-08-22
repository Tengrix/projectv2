import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {setPassTC} from "../../../a1-main/BLL/authReducer";
import {useFormik} from "formik";
import {Redirect, useParams} from 'react-router-dom';
import {AppRootStateType} from "../../../a1-main/BLL/store";
import {PATH} from "../../../a1-main/UI/Routes/Routes";
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
const SetPassword = () =>{
    const {token} = useParams<{token:string}>()
    const dispatch = useDispatch()
    const isUpdated = useSelector<AppRootStateType, boolean>(state => state.auth.isPassSet)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues:{
            password:'',
            token:token
        },
        validate:(values)=>{
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.password)) {
                errors.password = 'Invalid email address';
            }
        },
        onSubmit:values => {
            dispatch(setPassTC(values))
            formik.resetForm()
        }
    })
    if(isUpdated){
        return <Redirect to={PATH.login}/>
    }
    if (!isLoggedIn) {
        return <Redirect to={PATH.login}/>
    }

    return(
        <div>
            <form onSubmit={formik.handleSubmit} action="">
                <input type={'password'} placeholder={'password'} {...formik.getFieldProps('password')} />
                {formik.touched.password&& formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                <button type={'submit'}>Submit</button>
            </form>
        </div>
    )
}
export default SetPassword