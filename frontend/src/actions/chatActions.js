import axios from 'axios';
import { CHAT_ADD_FAIL, CHAT_ADD_REQUEST, CHAT_ADD_SUCCESS, CHAT_LIST_FAIL, CHAT_LIST_REQUEST, CHAT_LIST_SUCCESS, MYLIST_CHAT_FAIL, MYLIST_CHAT_REQUEST, MYLIST_CHAT_SUCCESS } from "../constants/chatConstants";

export const MyListChat = (orderId) => async (dispatch) => {
    dispatch({
        type: MYLIST_CHAT_REQUEST, payload: {orderId}
    });
    try {
        const { data } = await axios.post('/api/chat/getorderchat', {orderId});
        dispatch({
            type: MYLIST_CHAT_SUCCESS, payload: data 
        });
    } catch(error) {
        dispatch({
            type: MYLIST_CHAT_FAIL, payload: error.message 
        });
    }
};

export const ListChat = () => async (dispatch) => {
    dispatch({
        type: CHAT_LIST_REQUEST
    });
    try {
        const { data } = await axios.get('/api/chat');
        dispatch({
            type: CHAT_LIST_SUCCESS, payload: data 
        });
    } catch(error) {
        dispatch({
            type: CHAT_LIST_FAIL, payload: error.message 
        });
    }
};

export const AddChat = (userId, orderId, message) => async(dispatch) => {
    dispatch({ type: CHAT_ADD_REQUEST, payload: {userId, orderId, message} });
    try {
        const {data} = await axios.post('/api/chat/add', {userId, orderId, message});
        dispatch({ type: CHAT_ADD_SUCCESS, payload: data});
    } catch(error) {
        dispatch({
            type: CHAT_ADD_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}
