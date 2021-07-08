import React, { useState, useEffect } from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModule from './modules/LoadingModule';
import MessageBox from './modules/MessageBox';
import { register } from '../actions/userActions';

export default function Register(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const redirect = props.location.search 
    ? props.location.search.split('=')[1] 
    : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    const handleName = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        e.preventDefault();
        setConfirmPassword(e.target.value)
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if (confirmPassword === password) {
            dispatch(register(name, email, password));
        } else {
            setConfirmError('Password not confirmed');
        }
    }

    return (
        <div className="register-container">
            <div className="register-content">
                <form>
                    <h3>Create Account</h3>
                    <input type="text" placeholder="Your name" value={name} onChange={e => handleName(e)}/>
                    <input type="email" placeholder="E-mail adress" value={email} onChange={e => handleEmail(e)}/>
                    <input type="password" placeholder="Password" value={password} onChange={e => handlePassword(e)}/>
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => handleConfirmPassword(e)}/>
                    <button onClick={e => handleRegister(e)}><PersonAddIcon /><span>Register</span></button>
                    { loading && <LoadingModule /> }
                    { error && <MessageBox variant="danger">{error}</MessageBox>}
                    { confirmError && <MessageBox variant="danger">{confirmError}</MessageBox>}
                </form>
            </div>
        </div>
    )
}
