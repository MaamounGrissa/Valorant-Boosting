import axios from "axios";
import { USER_EDIT_FAIL, USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants";

export const register = (name, email, password) => async(dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
    try {
        const {data} = await axios.post('/api/users/register', {name, email, password});
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch(error) {
        dispatch({
            type: USER_REGISTER_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const signin = (email, password) => async(dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const {data} = await axios.post('/api/users/signin', {email, password});
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch(error) {
        dispatch({
            type: USER_SIGNIN_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const AddBooster = (name, email, password, rule, rank, paypal, percentage) => async(dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password, rule, rank, paypal, percentage } });
    try {
        const {data} = await axios.post('/api/users/add', {name, email, password, rule, rank, paypal, percentage});
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data});
    } catch(error) {
        dispatch({
            type: USER_REGISTER_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const EditUser = (formData) => async(dispatch) => { 
    dispatch({
        type: USER_EDIT_REQUEST, payload: formData
    });
    try {
        const { data } = await axios.post('/api/users/edit', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({
            type: USER_EDIT_SUCCESS, payload: data
        });
        if(data[0]?._id) {
            localStorage.setItem('userInfo', JSON.stringify(data[0]));
        } 
    } catch (error) {
        dispatch({
            type: USER_EDIT_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const ListUsers = () => async (dispatch) => {
    dispatch({
        type: USER_LIST_REQUEST
    });
    try {
        const { data } = await axios.get('/api/users');
        dispatch({
            type: USER_LIST_SUCCESS, payload: data 
        });
    } catch(error) {
        dispatch({
            type: USER_LIST_FAIL, payload: error.message 
        });
    }
};


export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_SIGNOUT });
}