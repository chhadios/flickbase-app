import * as users from './index'
import axios from 'axios';
import {getAuthHeader,removeTokenCookie,getTokenCookie} from '../../utils/tools';
axios.defaults.headers.post['Content-Type']='application/json'


export const registerUser=(values)=>{
    return async(dispatch)=>{
        try{
            const user= await axios.post(`/api/user/register`,{
                email: values.email,
                password: values.password
            });
            dispatch(users.authUser({data: user.data, auth: true}))
            dispatch(users.successGlobal('Welcome !!. Check your email and validate your account'))
        }catch(error){
            dispatch(users.errorGlobal(error.response.data.message))
        }
    }
}

export const signInUser =(values)=> {
    return async(dispatch)=>{
        try{
            const user= await axios.post(`/api/user/signin`,{
                email: values.email,
                password: values.password
            });
            dispatch(users.authUser({data: user.data, auth: true}))
            dispatch(users.successGlobal('Welcome !!'))
        }catch(error){
            dispatch(users.errorGlobal(error.response.data.message))
        }
    }
}

export const isAuthUser=()=>{
    return async(dispatch)=>{
        try{
            if(!getTokenCookie()){
                throw new Error();
            }
            const user=await axios.get(`/api/user/isauth`,getAuthHeader());
            dispatch(users.authUser({data: user.data, auth: true}))
            
        }catch(error){
            dispatch(users.authUser({data:{}, auth: false}))
            
        }
    }
}

export const signOut=()=>{
    return async (dispatch)=>{
        removeTokenCookie();
        dispatch(users.signOut())
    }
}
export const changeEmail=(data)=>{
    return async(dispatch)=>{
        try{
            await axios.patch(`/api/user/update_email`,{
                email:data.email,
                newemail:data.newemail
            },getAuthHeader());
            dispatch(users.changeUserEmail(data.newemail))
            dispatch(users.successGlobal('changed successfully'))
        }catch(error){
            dispatch(users.errorGlobal(error.response.data.message))
        }
    }
}
export const updateUserProfile=(data)=>{
    return async(dispatch,getState)=>{
        try{
            const profile=await axios.patch(`/api/user/profile`,data,
            getAuthHeader())

            const userData={
                ...getState().users.data,
                ...profile.data
            }
            dispatch(users.updateUserProfile(userData))
            dispatch(users.successGlobal('profile Updated '))
        }catch(error){
            dispatch(users.errorGlobal(error.response.data.message))
        }
    }
}