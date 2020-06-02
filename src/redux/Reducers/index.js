import {combineReducers} from 'redux'
import AuthReducers from './AuthReducer'
import PostReducers from './postReducer'
import PostPhotoReducers from './postPhotoreducer'



export default combineReducers({
    Auth:AuthReducers,
    Post:PostReducers,
    PostPhoto:PostPhotoReducers
})