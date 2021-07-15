import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import { AddChat, MyListChat } from '../../actions/chatActions';

export default function ChatModule(props) {
    let myChat;
    const dispatch = useDispatch();
    const { order } = props;
    const myChatList = useSelector( state => state.myChatList);
    const {loading, error, chat} = myChatList;
    const [message, setMessage] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
       if (order || props.reloadChat) {
           dispatch(MyListChat(order));
           props.reloaded();
       }
    }, [dispatch, order, props, props.reloadChat]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if(message !== '') {
            dispatch(AddChat(userInfo._id, order, message)).then(() => {
                dispatch(MyListChat(order));
                setMessage('');
            });
        }
    }

    if (loading) {
        return (
            <div className="chat-loading">
                <img src="/images/loading-36.gif" alt="Loading" />
            </div>
        );
    } else if (error) {
        return null;
    } else {
        myChat = chat;
        return (
            <div className="chat-module-container">
                <div id="chat-messages" className="chat-messages">
                    {
                        myChat.map((message, index) =>
                            <div key={index} 
                                className={message.userId === userInfo._id ? 'message-container' : 'message-container reverse'}>
                                    {
                                        message.userId === userInfo._id && userInfo.photo ? (
                                            <img 
                                                title={userInfo.name}
                                                src={userInfo.photo} 
                                                alt="User" />
                                        ) : (
                                            <img 
                                                title={message.userId === userInfo._id ? userInfo.name : "Booster"}
                                                src="/images/default-profile.png" 
                                                alt="User" />
                                        )
                                    }
                                    <span className="chat-message">
                                        {message.message}
                                        <em>{Moment(message.createdAt).format('DD/MM/YY hh:mm')}</em>
                                    </span>
                            </div>
                        )
                    }
                </div>
                <div className="chat-action">
                    <form id="chatsend" onSubmit={e => handleSendMessage(e)} autoComplete="off">
                        <textarea type="text" placeholder="Enter your message ..." onChange={e => setMessage(e.target.value)}>
                        </textarea>
                        <button type="submit" onClick={e => handleSendMessage(e)} >
                            <SendIcon />
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
