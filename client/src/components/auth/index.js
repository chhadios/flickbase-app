import React,{useState, useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch , useSelector} from 'react-redux';
import { registerUser, signInUser} from '../../store/actions/users_actions';
import { TextField, Button } from '@material-ui/core';
import PreventAuthRoute from '../../hoc/preventAuthRouth';
const Auth = (props) => {

    const [register,setRegister]=useState(false)
    const notifications=useSelector(state=>state.notification)
    const dispatch = useDispatch();

    const formic = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('sorry email is required')
                .email('enter a valid email'),
            password: Yup.string()
                .required('enter the password')

        }),
        onSubmit: (values, { resetForm }) => {
            handleSubmit(values)
        }
    });

    const handleSubmit=(values)=>{
        if(register){
            dispatch(registerUser(values))
        }else{
            dispatch(signInUser(values))
        }
    }

    const errorHelper = (formic, values) => ({
        error: formic.errors[values] && formic.touched[values] ? true : false,
        helperText: formic.errors[values] && formic.touched[values] ? formic.errors[values] : null
    });


    useEffect(()=>{
        if(notifications && notifications.success){
            props.history.push('/dashboard')
        }
    },[notifications,props.history])

    return (
        <PreventAuthRoute>
            <div className="auth_container">
                <h1>Authenticate</h1>
                <form className="mt-3" onSubmit={formic.handleSubmit}>
                    <div className="form-group">
                        <TextField
                            style={{ width: '100%' }}
                            name="email"
                            label="Enter your email"
                            variant="outlined"
                            {...formic.getFieldProps('email')}
                           {...errorHelper(formic,'email')}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            style={{ width: '100%' }}
                            name="password"
                            label="Enter your password"
                            type="password"
                            variant="outlined"
                            {...formic.getFieldProps('password')}
                            {...errorHelper(formic,'password')}
                        />
                    </div>
                    <Button variant="contained" color="primary" type="submit"
                    size="large">
                        {register ? 'Register':'Log in'}
                    </Button>
                    <Button 
                    className="mt-3"
                    variant="outlined"
                     color="secondary" 
                    size="large"
                    onClick={()=> setRegister(!register)}>
                        want to {!register ? 'Register':'Login'}
                    </Button>
                </form>


            </div>

        </PreventAuthRoute>
    )
}

export default Auth;