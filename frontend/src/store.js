import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { blogDetailsReducer, blogListReducer } from './reducer/blogReducers';
import { boosterAddReducer, boosterDeleteReducer, boosterEditReducer, userEditReducer, userListReducer, userRegisterReducer, userSigninReducer } from './reducer/userReducers';

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
    boosterAdd: boosterAddReducer,
    boosterEdit: boosterEditReducer,
    boosterDelete: boosterDeleteReducer,
   
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
