import React from 'react'
import {useDispatch} from "react-redux";
import {forgotPassTC} from "../../../a1-main/BLL/authReducer";
import {useFormik} from "formik";
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
const Password = () =>{
    const dispatch = useDispatch()
    const fromEmail ='nya-admin@nya.nya'
    const msg = 'Please get new pass'

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