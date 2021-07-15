import { CHAT_ADD_FAIL, CHAT_ADD_REQUEST, CHAT_ADD_SUCCESS, CHAT_LIST_FAIL, CHAT_LIST_REQUEST, CHAT_LIST_SUCCESS, MYLIST_CHAT_FAIL, MYLIST_CHAT_REQUEST, MYLIST_CHAT_SUCCESS } from "../constants/chatConstants";

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

export const chatListReducer = (state = { chat: [] }, action) => {
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

export const myChatListReducer = (state = { chat: [] }, action) => {
    switch(action.type){
        case MYLIST_CHAT_REQUEST:
            return {loading: true};
        case MYLIST_CHAT_SUCCESS:
            return {loading: false, chat: action.payload};
        case MYLIST_CHAT_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}