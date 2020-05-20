import {combineReducers} from 'redux'
import AuthReducers from './AuthReducer'
import PostReducers from './postReducer'



export default combineReducers({
    Auth:AuthReducers,
    Post:PostReducers
})