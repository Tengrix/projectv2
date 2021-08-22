import {useFormik} from 'formik';
import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../a1-main/BLL/store";
import {getLoginTC} from "../../../a1-main/BLL/authReducer";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../a1-main/UI/Routes/Routes";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 4) {
                errors.password = 'Invalid password'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(getLoginTC(values))
            formik.resetForm();
        },
    })
    if (isLoggedIn) {
        return <Redirect to={PATH.profile}/>
    }
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input type={'email'} placeholder={'email'} {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email &&
                    <div style={{color: 'red'}}>{formik.errors.email}</div>}
                </div>
                <div>
                    <input type={'password'} placeholder={'password'} {...formik.getFieldProps("password")} />
                    {formik.touched.password && formik.errors.password &&
                    <div style={{color: 'red'}}>{formik.errors.password}</div>}
                </div>
                <input type="checkbox" {...formik.getFieldProps("rememberMe")} />
                <button type={'submit'} color={'primary'}>Login</button>
            </form>
        </div>
    )
}
export default Login