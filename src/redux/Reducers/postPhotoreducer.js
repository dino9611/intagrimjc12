import {
    INPUT_CAPTION_CHANGE,
    IMAGE_CHANGE,
    POST_PHOTO_LOADING,
    POST_PHOTO_SUCCESS,
    POST_PHOTO_FAIL
} from './../types'


const INITIAL_STATE = {
    image: null,
    caption: '',
    loading: false,
    error: ''
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case INPUT_CAPTION_CHANGE :
            return { ...state, caption: action.payload }
        case IMAGE_CHANGE :
            return { ...state, image: action.payload }
        case POST_PHOTO_LOADING :
            return { ...state, loading: true, error: '' }
        case POST_PHOTO_FAIL :
            return { ...state, loading: false, error: action.payload }
        case POST_PHOTO_SUCCESS :
            return INITIAL_STATE
        default :
            return state;
    }
}