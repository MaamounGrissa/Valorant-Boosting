import axios from "axios";
import { ORDER_ADD_FAIL, ORDER_ADD_REQUEST, ORDER_ADD_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../constants/orderConstants";

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
}