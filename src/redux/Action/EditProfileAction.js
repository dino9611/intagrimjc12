import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
    INIT_EDIT_PROFILE,
    INPUT_EDIT_PROFILE_TEXT,
    SAVE_PROFILE_LOADING,
    USER_LOGIN_SUCCESS,
    LOGIN_USER_SUCCESS
} from '../types';
import { API_URL } from './../../support/ApiUrl';


export const onInputEditProfileText = (prop, value) => {
    return {
        type: INPUT_EDIT_PROFILE_TEXT,
        payload: { 
            prop, value
        }
    }
}

export const initEditProfile = (user) => {
    return {
        type: INIT_EDIT_PROFILE,
        payload: user
    }
}


export const saveProfile = ({ username, displayname, bio }) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_PROFILE_LOADING })
            const token = await AsyncStorage.getItem('usertoken')
            const options = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const res = await axios.put(API_URL + '/user/editprofiledata',{
                                    username,
                                    displayname,
                                    bio
                                }, options)
            await AsyncStorage.setItem('usertoken', res.data.token)
            dispatch({ 
                type: LOGIN_USER_SUCCESS,
                payload: res.data
            })

        } catch(err) {
            console.log(err)
        }
    }
}

export const saveProfileImage = (img) => {
    return async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem('usertoken')
            const options = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': `multipart/form-data`
                }
            }

            var formdata = new FormData();
            const image = {
                uri: img.path,
                type: 'image/jpeg',
                name: 'photo.jpg',
            }
            formdata.append('image', image)
            const res = await axios.put(API_URL + '/user/editprofileimage', formdata, options)
            
            await AsyncStorage.setItem('usertoken', res.data.token)
            dispatch({ 
                type: LOGIN_USER_SUCCESS,
                payload: res.data
            })
        } catch(err) {
            console.log(err)
        }
    }
}