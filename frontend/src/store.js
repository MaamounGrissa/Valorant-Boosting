import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { accountEditReducer, accountGETReducer, accountListReducer } from './reducer/accountReducers';
import { blogDetailsReducer, blogListReducer } from './reducer/blogReducers';
import { chatAddReducer, chatListReducer } from './reducer/chatReducers';
import { myListReducer, orderAddReducer, orderDeleteReducer, orderListReducer, statusChangeReducer } from './reducer/orderReducers';
import { boosterAddReducer, boosterDeleteReducer, boosterEditReducer, userEditReducer, userGetReducer, userListReducer, userRegisterReducer, userSigninReducer } from './reducer/userReducers';

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
    userGet: userGetReducer,

    orderList: orderListReducer,
    orderAdd: orderAddReducer,
    statusChange: statusChangeReducer,
    orderDelete: orderDeleteReducer,
    myList: myListReducer, 

    chatList: chatListReducer,
    chatAdd: chatAddReducer,

    accountList: accountListReducer,
    accountEdit: accountEditReducer,
    accountGet: accountGETReducer,
   
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
