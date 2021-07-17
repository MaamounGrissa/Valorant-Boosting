import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LoadingModule from '../LoadingModule.js';
import MessageBox from '../MessageBox.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ForwardIcon from '@material-ui/icons/Forward';
import ChatModule from '../ChatModule.js'
import { ChangeStatus, MyListOrders } from '../../../actions/orderActions.js';
import ConfirmModal from '../ConfirmModal.js'
import CachedIcon from '@material-ui/icons/Cached';
import SaveIcon from '@material-ui/icons/Save';
import { EditAccount, MyAccount } from '../../../actions/accountActions';


export default function ClientHome(props) {
    const dispatch = useDispatch();
    const { classes, theme, userInfo } = props;

    const myId = localStorage.getItem('myId') || false;

    const accountGet = useSelector((state) => state.accountGet);
    const { loadingAccount, errorAccount, account } = accountGet;

    const myList = useSelector( state => state.myList);
    const {loadingOrders, errorOrders, myOrders} = myList;

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [reloadChat, setReloadChat] = useState(false);
    const [accountName, setAccountName] = useState(null);
    const [accountPassword, setAccountPassword] = useState(null);
    const [summonerName, setSummonerName] = useState(null);

    useEffect(() => {
        if (myId) {
            dispatch(MyListOrders(myId));
            dispatch(MyAccount(myId));
        }            
    }, [dispatch, myId]);

    //  Pause ORDER

    const showPauseConfirmation = (orderId) => {
        setSelectedOrder(orderId);
        setShowConfirmation(true);
    }
  
    const pauseOrder = (e) => {
        e.preventDefault();
        dispatch(ChangeStatus(selectedOrder, 'Pause', null)).then(() => {
            LoadData();
            setShowConfirmation(false);
          })
    }

    const resumeOrder = (e, orderId) => {
        e.preventDefault();
        dispatch(ChangeStatus(orderId, 'Resume', null)).then(() => {
            LoadData();
          })
    }

    const saveAccount = (e) => {
        e.preventDefault();
        dispatch(EditAccount(
            myId, 
            accountName ? accountName : account ? account.name : '', 
            accountPassword ? accountPassword : account ? account.password : '',
            summonerName ? summonerName : account ? account.summoner : ''
        ));
        LoadData();
    }

    // Reload Data

    const LoadData = () => {
        dispatch(MyListOrders(myId));
        dispatch(MyAccount(myId));
        setSelectedOrder(null)
    }

    const ranks = [
        "iron",
        "bronze",
        "silver",
        "gold",
        "platinum",
        "diamond",
        "immortal"
    ];

    const divisions = [
        "I",
        "II",
        'III',
    ]

    const ratingAmount = [
        " 0-20",
        "21-40",
        "41-60",
        "61-80",
        "81-100",
    ]

    if (loadingOrders || loadingAccount) {
        return ( <LoadingModule></LoadingModule> );
    } else if (errorOrders || errorAccount) {
        return ( <MessageBox variant="danger">{errorOrders || errorAccount}</MessageBox> );
    } else {
        const myProgressOrders = myOrders.filter(order => order.status === "Looking for a booster" || order.status === "In progress")
        return (
            <Grid container spacing={3}>
                {/* Select Order */}
                <Grid item xs={12}>
                    <Paper className={theme && userInfo.rule === 'client' ? "mypaper-box" : 'normal-paper'} >
                    <div className="account-form">
                        <h3>Valorant account informations</h3>
                        <form>
                            <div className="client-account-formgroup">
                                <span>Account name</span>
                                <input type="text" placeholder="Account name" 
                                value={accountName ? accountName : account.name} onChange={e => setAccountName(e.target.value)} />
                            </div>
                            <div className="client-account-formgroup">
                                <span>Account password</span>
                                <input type="text" placeholder="Account password" 
                                value={accountPassword ? accountPassword : account.password} onChange={e => setAccountPassword(e.target.value)} />
                            </div>
                            <div className="client-account-formgroup">
                                <span>Summoner name</span>
                                <input type="text" placeholder="Summoner name" 
                                value={summonerName ? summonerName : account.summoner} onChange={e => setSummonerName(e.target.value)} />
                            </div>
                            
                            <button type="submit" onClick={e => saveAccount(e)}><SaveIcon /> Save</button> 
                        </form>
                    </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className={theme && userInfo.rule === 'client' ? "myorder-select client" : "myorder-select"}>
                        <h3>Select Order</h3>
                        <TableContainer component={Paper}>
                            <Table className={classes.table + 'client-table'} aria-label="simple table">
                            <TableHead className="custom-thead">
                                <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    myProgressOrders.map(order =>
                                        <TableRow key={order._id} 
                                            className={selectedOrder === order._id ? 'mytablerow active' : 'mytablerow'} 
                                            onClick={() => setSelectedOrder(order._id)}>
                                            <TableCell>{Moment(order.createdAt).format('DD/MM/YY')}</TableCell>
                                            <TableCell>{order.status}</TableCell>
                                            <TableCell>{parseInt(order.price)}&nbsp;$</TableCell>
                                            <TableCell> 
                                                {
                                                    order.isPaused ? (
                                                        <button 
                                                            className='paid-button blue'
                                                            onClick={(e) => resumeOrder(e, order._id)}>
                                                            Resume
                                                        </button>
                                                    ) : (
                                                        <button 
                                                            className='paid-button red' 
                                                            onClick={() => showPauseConfirmation(order._id)}>
                                                            Pause
                                                        </button>
                                                    )
                                                }  
                                                
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>
                {/* Order Informations */}
                <Grid item xs={12} md={4} className={theme && userInfo.rule === 'client' ? "client-dashbord" : ''}>
                    <Paper className={classes.paper}>
                        {
                            myOrders.find(order => order._id === selectedOrder) ? (
                                <div className="myorders-infos">
                                    <h4>{myOrders.find(order => order._id === selectedOrder).boostType}</h4>
                                    {
                                        myOrders.find(order => order._id === selectedOrder).boostType === 'Rank Boosting' ? (
                                            <div className="myorders-rank">
                                                <div>
                                                    <img src={`/images/ranks/${ranks[myOrders.find(order => order._id === selectedOrder).startRank - 1]}.png`} alt="Rank" />
                                                    <h3>
                                                        <span>{ranks[myOrders.find(order => order._id === selectedOrder).startRank - 1]}</span>
                                                        <span>{divisions[myOrders.find(order => order._id === selectedOrder).startDivision - 1]}</span>
                                                        <span className="mini-text">{ratingAmount[(myOrders.find(order => order._id === selectedOrder).rankRating / 10) - 1]}</span>
                                                    </h3>
                                                </div>
                                                <div>
                                                    <ForwardIcon />
                                                </div>
                                                <div>
                                                    <img src={`/images/ranks/${ranks[myOrders.find(order => order._id === selectedOrder).desiredRank - 1]}.png`} alt="Rank" />
                                                    <h3>
                                                        <span>{ranks[myOrders.find(order => order._id === selectedOrder).desiredRank - 1]}</span>
                                                        <span>{divisions[myOrders.find(order => order._id === selectedOrder).desiredDivision - 1]}</span>
                                                    </h3>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="myorders-rank">
                                                <div>
                                                    <img src={`/images/ranks/${ranks[myOrders.find(order => order._id === selectedOrder).desiredRank - 1]}.png`} alt="Rank" />
                                                    <h3>
                                                        <span>{ranks[myOrders.find(order => order._id === selectedOrder).desiredRank - 1]}</span>
                                                        <span>{divisions[myOrders.find(order => order._id === selectedOrder).desiredDivision - 1]}</span>
                                                    </h3>
                                                </div>
                                                <div>
                                                    <h5>{myOrders.find(order => order._id === selectedOrder).games + ' Games'}</h5>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="bordred-container">
                                        <div className="flex between">
                                            <span>Boost Queue</span><strong>{myOrders.find(order => order._id === selectedOrder).duoGame ? 'Duo Boost' : 'Single Boost'}</strong>
                                        </div>
                                        <div className="flex between">
                                            <span>Server</span><strong>{myOrders.find(order => order._id === selectedOrder).server}</strong>
                                        </div>
                                        <div className="flex between">
                                            <span>Specific Agents</span><strong>{myOrders.find(order => order._id === selectedOrder).specificAgents ? 'Yes' : 'No'}</strong>
                                        </div>
                                        <div className="flex between">
                                            <span>Priority order</span><strong>{myOrders.find(order => order._id === selectedOrder).priorityOrder ? 'Yes' : 'No'}</strong>
                                        </div>
                                        <div className="flex between">
                                            <span>With streaming</span><strong>{myOrders.find(order => order._id === selectedOrder).withStreaming ? 'Yes' : 'No'}</strong>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="default-display">
                                    <h4>Order informations</h4>
                                </div>
                            )
                        }
                    </Paper>
                </Grid>
                {/* Chat */}
                <Grid item xs={12} md={4} className={theme && userInfo.rule === 'client' ? "client-dashbord" : ''}>
                    <Paper className={classes.paper}>
                        <div className="paper-header">
                            <div className="paper-title">Chat</div>
                            <div className="reload-chat"><CachedIcon onClick={e => setReloadChat(true)} /></div>
                            <div className="button-container">
                                <select 
                                    value={selectedOrder ? selectedOrder : 0} 
                                    onChange={e => setSelectedOrder(e.target.value)}
                                    className="orders-select">
                                    <option value={0}>Select Order</option>
                                    {
                                        myOrders.map(order =>
                                            <option key={order._id} value={order._id}> {order._id.substring(order._id.length - 5)} | {Moment(order.createdAt).format('DD/MM/YY')}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="paper-content chat">
                            <ChatModule order={selectedOrder} reloadChat={reloadChat} reloaded={e => setReloadChat(false)} />
                        </div>
                    </Paper>
                </Grid>
                <ConfirmModal
                    show={showConfirmation} 
                    qst='Are you sure to pause this order ?'
                    title='Pause Order'
                    onConfirm={e => pauseOrder(e)} 
                    onClose={() => {setShowConfirmation(false)}}>
                </ConfirmModal>
            </Grid>
        )
    }
}
