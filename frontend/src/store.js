import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { blogDetailsReducer, blogListReducer } from './reducer/blogReducers';
import { categoryDetailsReducer, categoryListReducer } from './reducer/categoryReducers';
import { instagramListReducer } from './reducer/instagramReducers';
import { productDetailsReducer, productListReducer } from './reducer/productReducers';
import { projectDetailsReducer, projectListReducer } from './reducer/projectReducers';
import { sliderListReducer } from './reducer/sliderReducers';
import { userSigninReducer } from './reducer/userReducers';

const initialState = {
    userSignin : {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
};

const reducer = combineReducers({

    userSignin: userSigninReducer,

    sliderList: sliderListReducer,

    categoryList: categoryListReducer,
    categoryDetails: categoryDetailsReducer,

    productList: productListReducer,
    productDetails: productDetailsReducer,

    projectList: projectListReducer,
    projectDetails: projectDetailsReducer,

    blogList: blogListReducer,
    blogDetails: blogDetailsReducer,

    instagramList: instagramListReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
    );

export default store;
