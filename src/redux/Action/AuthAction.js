import Axios from 'axios'

import{
    START_REGISTER,
    START_LOGIN,
    REGISTER_FAILED,
    LOGIN_FAILED,
    USER_LOGOUT,
    LOGIN_USER_SUCCESS
}from '../types'
import AsyncStorage from '@react-native-community/async-storage'
import {API_URL} from './../../support/ApiUrl'

export const UserRegister=({email,username,password,conpassword})=>{
    return (dispatch)=>{
        dispatch({ type: START_REGISTER })
        if(
            email !== '' 
            && username !== '' 
            && password !== '' 
            && conpassword !== ''
        ){
            if(password===conpassword){
                Axios.post(`${API_URL}/user/register`, { email, username, password })
                .then((res)=>{
                    Axios.post(`${API_URL}/user/login`, { email, password })
                    .then(async (res) => {
                        console.log(res.data)
                        try {
                            await AsyncStorage.setItem('usertoken', res.data.token);
                            dispatch({
                                type: LOGIN_USER_SUCCESS,
                                payload: res.data
                            });
                        } catch (err) {
                            dispatch({ 
                                type: REGISTER_FAILED, 
                                payload: err.message 
                            });
                        }   
                    })
                    .catch((err) => {
                        console.log(err)
                        dispatch({ 
                            type: REGISTER_FAILED, 
                            payload: err.response.data.message 
                        });
                    });
                }).catch((err)=>{
                    console.log(err)
                    dispatch({ 
                        type: REGISTER_FAILED, 
                        payload: err.response.data.message 
                    });
                })
            }else{
                dispatch({ 
                    type: REGISTER_FAILED, 
                    payload: 'Confirm Password and Password Must Equal'
                })
            }
        }else{
            dispatch({type:REGISTER_FAILED,payload:'ada yang kosong'})
        }
    }
}