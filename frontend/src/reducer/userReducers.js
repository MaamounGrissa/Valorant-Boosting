import { BOOSTER_ADD_FAIL, BOOSTER_ADD_REQUEST, BOOSTER_ADD_SUCCESS, BOOSTER_DELETE_FAIL, BOOSTER_DELETE_REQUEST, BOOSTER_DELETE_SUCCESS, BOOSTER_EDIT_FAIL, BOOSTER_EDIT_REQUEST, BOOSTER_EDIT_SUCCESS, GET_USER_FAIL, GET_USER_REQUEST, GET_USER_SUCCESS, USER_EDIT_FAIL, USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNOUT:
            return {}
        default:
            return state;
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const boosterAddReducer = (state = { feedback: '' }, action) => {
    switch(action.type){
        case BOOSTER_ADD_REQUEST:
            return {loading: true};
        case BOOSTER_ADD_SUCCESS:
            return {loading: false, feedback: action.payload};
        case BOOSTER_ADD_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const boosterEditReducer = (state = { feedback: '' }, action) => {
    switch(action.type){
        case BOOSTER_EDIT_REQUEST:
            return {loading: true};
        case BOOSTER_EDIT_SUCCESS:
            return {loading: false, feedback: action.payload};
        case BOOSTER_EDIT_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const boosterDeleteReducer = (state = { feedback: '' }, action) => {
    switch(action.type){
        case BOOSTER_DELETE_REQUEST:
            return {loadingRemove: true};
        case BOOSTER_DELETE_SUCCESS:
            return {loadingRemove: false, feedback: action.payload};
        case BOOSTER_DELETE_FAIL:
            return {loadingRemove: false, error: action.payload};
        default:
            return state;
    }
}

export const userEditReducer = (state = { feedbackEdit: [] }, action) => {
    switch(action.type){
        case USER_EDIT_REQUEST:
            return {loadingEdit: true};
        case USER_EDIT_SUCCESS:
            return {loadingEdit: false, feedbackEdit: action.payload};
        case USER_EDIT_FAIL:
            return {loadingEdit: false, errorEdit: action.payload};
        default:
            return state;
    }
}

export const userListReducer = (state = { loading: true, users: [] }, action) => {
    switch(action.type){
        case USER_LIST_REQUEST:
            return {loading: true};
        case USER_LIST_SUCCESS:
            return {loading: false, users: action.payload};
        case USER_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userGetReducer = (state = {user : {}}, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return { loadingUser: true };
        case GET_USER_SUCCESS:
            return { loadingUser: false, user: action.payload };
        case GET_USER_FAIL:
            return { loadingUser: false, errorUser: action.payload };
        case USER_SIGNOUT:
            return {}
        default:
            return state;
    }
}