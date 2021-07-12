import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingModule from './modules/LoadingModule';
import MessageBox from './modules/MessageBox';
import PersonIcon from '@material-ui/icons/Person';

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
        <div className="register-container">
            <div className="register-content">
                <form>
                    <h3>Login</h3>
                    <input required type="email" placeholder="E-mail adress" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <button onClick={e => submitHandler(e)} ><PersonIcon /><span>Login</span></button>
                    { loading && <LoadingModule /> }
                    { error && <MessageBox variant="danger">{error}</MessageBox>}
                </form>
            </div>
        </div>
    )
}
