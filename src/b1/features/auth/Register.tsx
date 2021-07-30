import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {getRegisterTC} from "../../../a1-main/BLL/authReducer";
import {AppRootStateType} from "../../../a1-main/BLL/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../a1-main/UI/Routes/Routes";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const Register = () =>{
    const dispatch = useDispatch()
    const isRegistered = useSelector<AppRootStateType,boolean>(state => state.auth.isRegistered)
    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validate:(values)=>{
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if(!values.password){
                errors.password = 'Password is Required'
            }else if(values.password.length < 4){
                errors.password = 'Invalid password'
            }
            return errors;
        },
        onSubmit:values => {
            formik.resetForm()
            dispatch(getRegisterTC(values.email,values.password))

        }
    })
    if(isRegistered){
       return <Redirect to={PATH.login}/>
    }
    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input type={'email'} placeholder={'email'} {...formik.getFieldProps('email')} />
                {formik.touched.email&& formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                <input type={'password'} placeholder={'password'} {...formik.getFieldProps("password")} />
                {formik.touched.password&& formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                <button type={'submit'} color={'primary'}>Register</button>
            </form>
        </div>
    )
}
export default Register