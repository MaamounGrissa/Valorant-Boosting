import axios from "axios";
import { BLOG_DETAILS_FAIL, BLOG_DETAILS_REQUEST, BLOG_DETAILS_SUCCESS, BLOG_LIST_FAIL, BLOG_LIST_REQUEST, BLOG_LIST_SUCCESS } from "../constants/blogConstants"

export const ListBlog = () => async (dispatch) => {
    dispatch({
        type: BLOG_LIST_REQUEST
    });
    try {
        const { data } = await axios.get('/api/blogs');
        dispatch({
            type: BLOG_LIST_SUCCESS, payload: data 
        });
    } catch(error) {
        dispatch({
            type: BLOG_LIST_FAIL, payload: error.message 
        });
    }
};

export const detailsBlog = (blogId) => async(dispatch) => {
    dispatch({
        type: BLOG_DETAILS_REQUEST, payload: blogId
    });
    try {
        const { data } = await axios.get(`/api/blogs/${blogId}`);
        dispatch({
            type: BLOG_DETAILS_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({
            type: BLOG_DETAILS_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}