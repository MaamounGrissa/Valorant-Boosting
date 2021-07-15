import axios from 'axios';
import { ACCOUNT_EDIT_FAIL, ACCOUNT_EDIT_REQUEST, ACCOUNT_EDIT_SUCCESS, ACCOUNT_GET_FAIL, ACCOUNT_GET_REQUEST, ACCOUNT_GET_SUCCESS, ACCOUNT_LIST_FAIL, ACCOUNT_LIST_REQUEST, ACCOUNT_LIST_SUCCESS } from '../constants/accountConstants';

export const ListAccount = () => async (dispatch) => {
    dispatch({
        type: ACCOUNT_LIST_REQUEST
    });
    try {
        const { data } = await axios.get('/api/accounts');
        dispatch({
            type: ACCOUNT_LIST_SUCCESS, payload: data 
        });
    } catch(error) {
        dispatch({
            type: ACCOUNT_LIST_FAIL, payload: error.message 
        });
    }
};


export const EditAccount = (userId, name, password, summoner) => async(dispatch) => {
    dispatch({ type: ACCOUNT_EDIT_REQUEST, payload: { userId, name, password, summoner } });
    try {
        const {data} = await axios.post('/api/accounts/edit', {userId, name, password, summoner});
        dispatch({ type: ACCOUNT_EDIT_SUCCESS, payload: data});
    } catch(error) {
        dispatch({
            type: ACCOUNT_EDIT_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const MyAccount = (id) => async(dispatch) => {
    dispatch({ type: ACCOUNT_GET_REQUEST, payload: { id } });
    try {
        const {data} = await axios.post('/api/accounts/getmyaccount', {id});
        dispatch({ type: ACCOUNT_GET_SUCCESS, payload: data});
    } catch(error) {
        dispatch({
            type: ACCOUNT_GET_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}