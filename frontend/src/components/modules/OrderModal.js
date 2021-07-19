import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { useHistory } from 'react-router-dom';
import NumberFormat from 'react-number-format';


export default function OrderModal(props) {

    let history = useHistory();
    const { order, userInfo } = props;

    const [sdkReady, setSdkReady] = useState(false);
    const [myOrder, setMyOrder] = useState({});

    const ranks = [
        "Iron",
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
        "Diamond",
        "Immortal"
    ];

    const divisions = [
        "I",
        "II",
        'III',
    ];

    useEffect(() => {

        if (props.showOrderModal) {
            document.getElementById('header').classList.add('under-element');
        } else {
            document.getElementById('header').classList.remove('under-element');
        }

        const addPaypalScript = async () => {
            const { data } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script);
        }

        if (order) {
            if (!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }

        if (order && userInfo) {
            setMyOrder({
                userid : userInfo._id, 
                account : '', 
                password : '', 
                summoner : '', 
                server : order.server, 
                type : order.boostType, 
                startrank : order.startRank || 0, 
                startdivision : order.startDivision || 0, 
                rankrating : order.ratingAmount || 0, 
                desiredrank : order.desiredRank, 
                desireddivision : order.desiredDivision, 
                games : order.games || 0,
                wins: order.wins || 0,
                duogame : order.duoGame, 
                chatoffline : order.chatOffline, 
                specificagents : order.specificAgents, 
                priorityorder : order.priorityOrder, 
                withstreaming : order.withStreaming, 
                price : order.price,
                payement : true,
            });
        }

    }, [order, props.showOrderModal, userInfo]);


    const successPayementHandler = (e) => {
        e.preventDefault();

        axios.post(
        '/api/orders/addneworder', {myOrder}
        ).then(() => {
            history.push('/dashbord');
        });
    }

    if (props.showOrderModal) {
        return (
            <div className="modal-container order-modal show">
                <div className="modal-box order-modal">
                    <div className="modal-header order-modal">
                        <h2>Payement checkout</h2>
                        <button id="close-modal" onClick={props.onClose} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className="order-modal-content">
                        <div className="modal-col">
                            <div className="order-block order-details">
                                <div className="order-block-title">Your order</div>
                                <div className="order-block-content">
                                    <div className="flex start">
                                        <img src="/images/vlrnt.png" alt="Vlrnt" width="90" />
                                        <div>
                                            {
                                                order.boostType === "Rank Boosting" ? (
                                                    <h3>
                                                        {ranks[order.startRank - 1]} {divisions[order.startDivision - 1]}
                                                        &nbsp;
                                                        {order.desiredRank ? 'to' : ''}
                                                        &nbsp;
                                                        {ranks[order.desiredRank - 1]} {divisions[order.desiredDivision - 1]}
                                                    </h3>
                                                ) : order.boostType === "Placement Boosting" ? (
                                                    <h3>
                                                        {ranks[order.desiredRank - 1]} {divisions[order.desiredDivision - 1]}
                                                        &nbsp;
                                                        {'Games : ' + order.games}
                                                        &nbsp;
                                                    </h3>
                                                ) : (
                                                    <h3>
                                                        {ranks[order.desiredRank - 1]} {divisions[order.desiredDivision - 1]}
                                                        &nbsp;
                                                        {'Wins : ' + order.wins}
                                                        &nbsp;
                                                    </h3>
                                                )
                                            }
                                            <p>Valorant&nbsp;{ order.boostType }</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                            <div className="order-block payement-methode">
                                <div className="order-block-title">Payement gateway</div>
                                <div className="order-block-content">
                                    <div className="order-submit">
                                        <img src="/images/paypal-logo.png" alt="paypal" width="200" />
                                        <div className='price'>
                                            <NumberFormat value={order.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                        </div>
                                    </div>                                        
                                </div>
                            </div>
                        </div>
                        <div className="modal-col">
                            <div className="order-block order-form">
                                <div className="order-block-title">Paypal Submit</div>
                                <div className="order-block-content">
                                    <div className="paypal-container">
                                        {
                                            sdkReady ? (
                                                <PayPalButton amount={order.price} onSuccess={successPayementHandler}/>
                                            ) : (
                                                'Paypal Not Ready !'
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}
