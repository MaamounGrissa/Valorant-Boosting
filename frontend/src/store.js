import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { blogDetailsReducer, blogListReducer } from './reducer/blogReducers';
import { userAddReducer, userEditReducer, userListReducer, userRegisterReducer, userSigninReducer } from './reducer/userReducers';

const initialState = {
    userSignin : {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
};


const reducer = combineReducers({

    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userEdit: userEditReducer,
    userList: userListReducer,
    userAdd: userAddReducer,

   
    blogList: blogListReducer,
    blogDetails: blogDetailsReducer,

})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
    );

export default store;
