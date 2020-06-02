import {
    SELECT_POST_PROFILE,
    HOME_REFRESHING,
    FILL_POST_LIST
} from './../types'
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import {API_URL} from './../../support/ApiUrl'


export const getListPost=()=>{
    return async(dispatch)=>{
        try {
            const Token=await AsyncStorage.getItem('usertoken')
            const options={
                headers:{
                    'Authorization': `Bearer ${Token}`
                }
            }
            dispatch({type:HOME_REFRESHING})
            const res = await Axios.get(`${API_URL}/post/getall`, options)
            console.log('berhasil get data')
            dispatch({
                type:FILL_POST_LIST,
                payload:res.data
            })
        } catch (error) {
            console.log(error)
        }

    }
}

export const tambahTreshold=()=>{
    return{
        type:'Tambahtreshold'
    }
}


export const selectProfilePost = (post) => {
    return {
        type: SELECT_POST_PROFILE,
        payload: post
    }
}