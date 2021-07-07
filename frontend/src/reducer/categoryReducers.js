import { CATEGORY_DETAILS_FAIL, CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS } from "../constants/categoryConstants";

export const categoryListReducer = (state = { loading: true, categories: [] }, action) =>{
    switch(action.type){
        case CATEGORY_LIST_REQUEST:
            return {loading: true};
        case CATEGORY_LIST_SUCCESS:
            return {loading: false, categories: action.payload};
        case CATEGORY_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const categoryDetailsReducer = (state = { loading: true, details: [] }, action) =>{
    switch(action.type){
        case CATEGORY_DETAILS_REQUEST:
            return {loading: true};
        case CATEGORY_DETAILS_SUCCESS:
            return {loading: false, details: action.payload};
        case CATEGORY_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}