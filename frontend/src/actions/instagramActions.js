import axios from "axios";
import { INSTAGRAM_LIST_FAIL, INSTAGRAM_LIST_REQUEST, INSTAGRAM_LIST_SUCCESS } from "../constants/instagramConstants"

export const ListInstagram = () => async (dispatch) => {
    dispatch({
        type: INSTAGRAM_LIST_REQUEST
    });
    try {
        const { data } = await axios.get('/api/instagrams');
        dispatch({
            type: INSTAGRAM_LIST_SUCCESS, payload: data 
        });
    } catch(error) {
        dispatch({
            type: INSTAGRAM_LIST_FAIL, payload: error.message 
        });
    }
};
