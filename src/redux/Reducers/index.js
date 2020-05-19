import {combineReducers} from 'redux'
import AuthReducers from './AuthReducer'

export default combineReducers({
    Auth:AuthReducers
})