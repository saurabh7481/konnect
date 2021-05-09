import {combineReducers} from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import alertReducer from './alertReducer';
import postsReducer from './postsReducer';

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    alert: alertReducer,
    posts: postsReducer
})