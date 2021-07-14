import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import { AddChat, ListChat } from '../../actions/chatActions';
import MessageBox from './MessageBox.js';

export default function ChatModule(props) {
    let myChat;
    const dispatch = useDispatch();
    const { order, users } = props;
    const chatList = useSelector( state => state.chatList);
    const {loading, error, chat} = chatList;
    const [message, setMessage] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
       if (order || props.reloadChat) {
           dispatch(ListChat());
           props.reloaded();
       }
    }, [dispatch, order, props, props.reloadChat]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if(message !== '') {
            dispatch(AddChat(userInfo._id, order, message)).then(() => {
                dispatch(ListChat());
                setMessage('');
            });
        }
    }

    if (loading) {
        return (
            <div className="chat-loading">
                <img src="/images/loading.gif" alt="Loading" />
            </div>
        );
    } else if (error) {
        return ( <MessageBox variant="danger">{error}</MessageBox> );
    } else {
        myChat = chat.filter(m => m.orderId === order);

        return (
            <div className="chat-module-container">
                <div id="chat-messages" className="chat-messages">
                    {
                        myChat.map((message, index) =>
                            <div key={index} 
                                className={users.find(u => u._id === message.userId)?.rule === 'client' ? 'message-container' : 'message-container reverse'}>
                                    {
                                        users.find(u => u._id === message.userId)?.photo ? (
                                            <img 
                                                title={users.find(u => u._id === message.userId)?.name}
                                                src={users.find(u => u._id === message.userId).photo} 
                                                alt="" />
                                        ) : (
                                            <img 
                                                title={users.find(u => u._id === message.userId)?.name}
                                                src="/images/default-profile.png" 
                                                alt="" />
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
