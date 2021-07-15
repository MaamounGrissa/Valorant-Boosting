import { ACCOUNT_EDIT_FAIL, ACCOUNT_EDIT_REQUEST, ACCOUNT_EDIT_SUCCESS, ACCOUNT_GET_FAIL, ACCOUNT_GET_REQUEST, ACCOUNT_GET_SUCCESS, ACCOUNT_LIST_FAIL, ACCOUNT_LIST_REQUEST, ACCOUNT_LIST_SUCCESS } from "../constants/accountConstants";


export const accountListReducer = (state = { accounts: [] }, action) => {
    switch(action.type){
        case ACCOUNT_LIST_REQUEST:
            return {loadingAccounts: true};
        case ACCOUNT_LIST_SUCCESS:
            return {loadingAccounts: false, accounts: action.payload};
        case ACCOUNT_LIST_FAIL:
            return {loadingAccounts: false, errorAccounts: action.payload};
        default:
            return state;
    }
}


export const accountEditReducer = (state = { feedback: '' }, action) => {
    switch(action.type){
        case ACCOUNT_EDIT_REQUEST:
            return {loading: true};
        case ACCOUNT_EDIT_SUCCESS:
            return {loading: false, feedback: action.payload};
        case ACCOUNT_EDIT_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const accountGETReducer = (state = { account: {} }, action) => {
    switch(action.type){
        case ACCOUNT_GET_REQUEST:
            return {loadingAccount: true};
        case ACCOUNT_GET_SUCCESS:
            return {loadingAccount: false, account: action.payload};
        case ACCOUNT_GET_FAIL:
            return {loadingAccount: false, errorAccount: action.payload};
        default:
            return state;
    }
}