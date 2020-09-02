import {USER_ACTION_TYPES} from '../actions/action_keywords'

const initialState = {
   streamUrl :'',
    keywords:[]
}

export const keywordReducer = (state = initialState,action) =>{
    switch(action.type){
        case  USER_ACTION_TYPES.USER_KEYWORDS :
            return {
                ...state,
                streamUrl:action.payload.streamUrl,
                keywords:action.payload.keywords
            }
        default:
            return state
    }

}