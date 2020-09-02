import {USER_ACTION_TYPES} from '../actions/action_signIn'

const initialState = {
    userInfo:{},
    loginStatus:false
}

export const userReducer = (state = initialState,action) =>{
    switch(action.type){
        case  USER_ACTION_TYPES.ON_GOOGLE_SIGNIN :
            return {
                ...state,
                userInfo:action.payload
            }
            case  USER_ACTION_TYPES.USER_LOGIN_STATUS :
                return {
                    ...state,
                    loginStatus:action.payload
                }
        default:
            return state
    }

}