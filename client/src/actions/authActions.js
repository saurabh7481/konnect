import api from '../utils/api';
import {setAlert} from './alertAction';
import {LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, LOGOUT, USER_LOADED, AUTH_ERROR} from './types';


export const getUser = () => async dispatch => {
    console.log('Bearer ' + localStorage.getItem('token'))
    try{
        const res = await api.get('/auth', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        console.log(res);
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const register = userData => async dispatch => {
    try{
        const res = await api.post('/users/register', userData);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data   
        });
        dispatch(getUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
          }

        dispatch({
            type: REGISTER_FAIL
        });
    }
}

export const login = (loginData) => async dispatch => {
    try{
        const res = await api.post('/users/login', loginData);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(getUser());
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
}

export const logout = () => ({
    type: LOGOUT
});