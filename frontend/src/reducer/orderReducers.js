import { ORDER_ADD_FAIL, ORDER_ADD_REQUEST, ORDER_ADD_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../constants/orderConstants";

export const orderListReducer = (state = { loadingOrders: true, orders: [] }, action) => {
    switch(action.type){
        case ORDER_LIST_REQUEST:
            return {loadingOrders: true};
        case ORDER_LIST_SUCCESS:
            return {loadingOrders: false, orders: action.payload};
        case ORDER_LIST_FAIL:
            return {loadingOrders: false, errorOrders: action.payload};
        default:
            return state;
    }
}

export const orderAddReducer = (state = { feedback: '' }, action) => {
    switch(action.type){
        case ORDER_ADD_REQUEST:
            return {loading: true};
        case ORDER_ADD_SUCCESS:
            return {loading: false, feedback: action.payload};
        case ORDER_ADD_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}