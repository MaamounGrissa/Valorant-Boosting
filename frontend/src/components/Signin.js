import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingModule from './modules/LoadingModule';
import MessageBox from './modules/MessageBox';

export default function Signin(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search 
    ? props.location.search.split('=')[1] 
    : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password))
    }
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div className="signin-page">
            <div className="signin-box">
                <form onSubmit={submitHandler}>
                    <div>
                        <h1>Sign In</h1>
                    </div>
                    { loading && <LoadingModule /> }
                    { error && <MessageBox variant="danger">{error}</MessageBox>}
                    <div className="form-group">
                        <label htmlFor="email">Email adress</label>
                        <input type="email" id="email" placeholder="Enter email..." required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter password..." required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="view-all comfirn-command">Login</button>
                </form>
            </div>
        </div>
    )
}
