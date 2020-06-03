import {
    INPUT_CAPTION_CHANGE,
    IMAGE_CHANGE,
    POST_PHOTO_LOADING,
    POST_PHOTO_SUCCESS,
    POST_PHOTO_FAIL
} from './../types'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {API_URL} from './../../support/ApiUrl'

export const OnInputCHange=(text)=>{
    return{
        type:INPUT_CAPTION_CHANGE,
        payload:text
    }
}
export const onImagePostChange=(image)=>{
    return{
        type:IMAGE_CHANGE,
        payload:image
    }
}


export const postingPhoto = ({ image, caption,userid }) => {
    return async (dispatch) => {
        try {

            dispatch({ type: POST_PHOTO_LOADING })

            const token = await AsyncStorage.getItem('usertoken')

            const options = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            }
            console.log(caption)
            const data = new FormData();
            const img = {
                uri: image.path,
                type: 'image/jpeg',
                name: 'photo.jpg',
            }
            data.append('image', img)
            data.append('data', JSON.stringify({ caption,userId:userid }))
            console.log(userid)
            console.log(img)

            const res = await axios.post(API_URL + '/post/addpost', data, options) 
            dispatch({ type: POST_PHOTO_SUCCESS })
            alert('photo berhasil di upload')
        } catch (err) {
            console.log(err)
            dispatch({ 
                type: POST_PHOTO_FAIL,
                payload: 'System Error'
            })
        }
    }
}