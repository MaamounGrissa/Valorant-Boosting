import { INSTAGRAM_LIST_FAIL, INSTAGRAM_LIST_REQUEST, INSTAGRAM_LIST_SUCCESS } from "../constants/instagramConstants";

export const instagramListReducer = (state = { loading: true, instagram: [] }, action) =>{
    switch(action.type){
        case INSTAGRAM_LIST_REQUEST:
            return {loading: true};
        case INSTAGRAM_LIST_SUCCESS:
            return {loading: false, instagram: action.payload};
        case INSTAGRAM_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}