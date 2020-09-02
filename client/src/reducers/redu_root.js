import { combineReducers } from 'redux';
import { userReducer } from './reducer_user';
import { keywordReducer } from './reducer_keywords';
export default combineReducers({
    userReducer,
    keywordReducer
});