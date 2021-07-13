import { CHANGE_STATUS_FAIL, CHANGE_STATUS_REQUEST, CHANGE_STATUS_SUCCESS, ORDER_ADD_FAIL, ORDER_ADD_REQUEST, ORDER_ADD_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../constants/orderConstants";

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

export const statusChangeReducer = (state = { feedback: '' }, action) => {
    switch(action.type){
        case CHANGE_STATUS_REQUEST:
            return {loading: true};
        case CHANGE_STATUS_SUCCESS:
            return {loading: false, feedback: action.payload};
        case CHANGE_STATUS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const orderDeleteReducer = (state = { feedback: '' }, action) => {
    switch(action.type){
        case ORDER_DELETE_REQUEST:
            return {loadingRemove: true};
        case ORDER_DELETE_SUCCESS:
            return {loadingRemove: false, feedback: action.payload};
        case ORDER_DELETE_FAIL:
            return {loadingRemove: false, error: action.payload};
        default:
            return state;
    }
}