import { USER_EDIT_FAIL, USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants";

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