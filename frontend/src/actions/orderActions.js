import axios from "axios";
import { CHANGE_STATUS_FAIL, CHANGE_STATUS_REQUEST, CHANGE_STATUS_SUCCESS, ORDER_ADD_FAIL, ORDER_ADD_REQUEST, ORDER_ADD_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../constants/orderConstants";

export const ListOrders = () => async (dispatch) => {
    dispatch({
        type: ORDER_LIST_REQUEST
    });
    try {
        const { data } = await axios.get('/api/orders');
        dispatch({
            type: ORDER_LIST_SUCCESS, payload: data 
        });
    } catch(error) {
        dispatch({
            type: ORDER_LIST_FAIL, payload: error.message 
        });
    }
};

// Add Order

export const AddOrder = (
    userid, 
    account, 
    password, 
    summoner, 
    server, 
    type, 
    startrank, 
    startdivision, 
    rankrating, 
    desiredrank, 
    desireddivision, 
    games, 
    duogame, 
    chatoffline, 
    specificagents, 
    priorityorder, 
    withstreaming, 
    price
) => async(dispatch) => {
    dispatch({ type: ORDER_ADD_REQUEST, payload: { 
        userid, 
        account, 
        password, 
        summoner, 
        server, 
        type, 
        startrank, 
        startdivision, 
        rankrating, 
        desiredrank, 
        desireddivision, 
        games, 
        duogame, 
        chatoffline, 
        specificagents, 
        priorityorder, 
        withstreaming, 
        price
     } });
    try {
        const {data} = await axios.post('/api/orders/add', {
            userid, 
            account, 
            password, 
            summoner, 
            server, 
            type, 
            startrank, 
            startdivision, 
            rankrating, 
            desiredrank, 
            desireddivision, 
            games, 
            duogame, 
            chatoffline, 
            specificagents, 
            priorityorder, 
            withstreaming, 
            price
        });
        dispatch({ type: ORDER_ADD_SUCCESS, payload: data});
    } catch(error) {
        dispatch({
            type: ORDER_ADD_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// Order Change Status

export const ChangeStatus = (id, status, boosterId) => async(dispatch) => {
    dispatch({ type: CHANGE_STATUS_REQUEST, payload: { id, status, boosterId } });
    try {
        const {data} = await axios.post('/api/orders/changestatus', { id, status, boosterId });
        dispatch({ type: CHANGE_STATUS_SUCCESS, payload: data});
    } catch(error) {
        dispatch({
            type: CHANGE_STATUS_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

// Delete Order

export const DeleteOrder = (orderId) => async(dispatch) => { 
    dispatch({
        type: ORDER_DELETE_REQUEST, payload: orderId
    });
    try {
        const { data } = await axios.delete(`/api/orders/${orderId}`);
        dispatch({
            type: ORDER_DELETE_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({
            type: ORDER_DELETE_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}