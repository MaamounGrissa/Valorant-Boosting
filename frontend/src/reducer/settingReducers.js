import { SETTING_EDIT_FAIL, SETTING_EDIT_REQUEST, SETTING_EDIT_SUCCESS, SETTING_LIST_FAIL, SETTING_LIST_REQUEST, SETTING_LIST_SUCCESS } from "../constants/settingConstants";

export const settingListReducer = (state = { setting: [] }, action) => {
    switch(action.type){
        case SETTING_LIST_REQUEST:
            return {loadingSetting: true};
        case SETTING_LIST_SUCCESS:
            return {loadingSetting: false, setting: action.payload};
        case SETTING_LIST_FAIL:
            return {loadingSetting: false, errorSetting: action.payload};
        default:
            return state;
    }
}


export const settingEditReducer = (state = { feedback: '' }, action) => {
    switch(action.type){
        case SETTING_EDIT_REQUEST:
            return {loadingSetting: true};
        case SETTING_EDIT_SUCCESS:
            return {loadingSetting: false, feedback: action.payload};
        case SETTING_EDIT_FAIL:
            return {loadingSetting: false, errorSetting: action.payload};
        default:
            return state;
    }
}