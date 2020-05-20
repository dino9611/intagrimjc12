import { 
    HOME_REFRESHING,
    FILL_POST_LIST,
    SELECT_POST_PROFILE
} from '../types';

const INITIAL_STATE = {
    homeRefreshing: false,
    postList: [],
    selectedPostDetailProfile: null,
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case HOME_REFRESHING : 
            return { ...state, homeRefreshing: true }
        case FILL_POST_LIST :
            return { ...state, postList: action.payload, homeRefreshing: false }
        case SELECT_POST_PROFILE:
            return {...state,selectedPostDetailProfile:action.payload}
        default :
            return state;
    }
}