import axios from "axios";
import { SLIDER_LIST_FAIL, SLIDER_LIST_REQUEST, SLIDER_LIST_SUCCESS } from "../constants/sliderConstants"

export const ListSlider = () => async (dispatch) => {
    dispatch({
        type: SLIDER_LIST_REQUEST
    });
    try {
        const { data } = await axios.get('/api/sliders');
        dispatch({
            type: SLIDER_LIST_SUCCESS, payload: data 
        });
    } catch(error) {
        dispatch({
            type: SLIDER_LIST_FAIL, payload: error.message 
        });
    }
};