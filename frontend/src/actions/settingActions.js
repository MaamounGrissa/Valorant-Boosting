import axios from 'axios';
import { SETTING_EDIT_FAIL, SETTING_EDIT_REQUEST, SETTING_EDIT_SUCCESS, SETTING_LIST_FAIL, SETTING_LIST_REQUEST, SETTING_LIST_SUCCESS } from '../constants/settingConstants';

export const ListSetting = () => async (dispatch) => {
    dispatch({
        type: SETTING_LIST_REQUEST
    });
    try {
        const { data } = await axios.get('/api/setting');
        dispatch({
            type: SETTING_LIST_SUCCESS, payload: data 
        });
    } catch(error) {
        dispatch({
            type: SETTING_LIST_FAIL, payload: error.message 
        });
    }
};


export const EditSetting = (divisionPrice, difficultyCoef) => async(dispatch) => {
    dispatch({ type: SETTING_EDIT_REQUEST, payload: { divisionPrice, difficultyCoef } });
    try {
        const {data} = await axios.post('/api/setting/edit', {divisionPrice, difficultyCoef});
        dispatch({ type: SETTING_EDIT_SUCCESS, payload: data});
    } catch(error) {
        dispatch({
            type: SETTING_EDIT_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}