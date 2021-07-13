import { CHAT_ADD_FAIL, CHAT_ADD_REQUEST, CHAT_ADD_SUCCESS, CHAT_LIST_FAIL, CHAT_LIST_REQUEST, CHAT_LIST_SUCCESS } from "../constants/chatConstants";

export const chatAddReducer = (state = { feedback: ''}, action) => {
    switch(action.type){
        case CHAT_ADD_REQUEST:
            return {loading: true};
        case CHAT_ADD_SUCCESS:
            return {loading: false, feedback: action.payload};
        case CHAT_ADD_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const chatListReducer = (state = { loading: true, chat: [] }, action) => {
    switch(action.type){
        case CHAT_LIST_REQUEST:
            return {loading: true};
        case CHAT_LIST_SUCCESS:
            return {loading: false, chat: action.payload};
        case CHAT_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}
