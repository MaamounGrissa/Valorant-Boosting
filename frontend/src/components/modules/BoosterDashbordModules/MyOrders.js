import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ListUsers } from '../../../actions/userActions';
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
import { ChangeStatus, ListOrders } from '../../../actions/orderActions.js';
import ConfirmModal from '../ConfirmModal.js'
import CachedIcon from '@material-ui/icons/Cached';
import { ListAccount } from '../../../actions/accountActions';


export default function MyOrders(props) {
    let clients, progressOrders;
    const dispatch = useDispatch();
    const { classes } = props;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userList = useSelector( state => state.userList);
    const {loading, error, users} = userList;
    const accountList = useSelector( state => state.accountList);
    const { accounts } = accountList;
    const orderList = useSelector( state => state.orderList);
    const {loadingOrders, errorOrders, orders} = orderList;
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [qst, setQst] = useState('');
    const [title, setTitle] = useState('');
    const [reloadChat, setReloadChat] = useState(false);

    

    useEffect(() => {
        dispatch(ListUsers());
        dispatch(ListOrders());
        dispatch(ListAccount());
    }, [dispatch]);

    //  DROP ORDER

    const showDeleteConfirmation = (orderId) => {
        setSelectedOrder(orderId);
        setShowConfirmation(true);
        setQst("Are you sure to drop this order ?");
        setTitle('Drop order');
    }
  
    const deleteOrder = (e) => {
        e.preventDefault();
        dispatch(ChangeStatus(selectedOrder, 'Looking for a booster', '')).then(() => {
            LoadData();
            setShowConfirmation(false);
          })
    }

    // FINISH ORDER

    const showFinishConfirmation = (orderId) => {
        setSelectedOrder(orderId);
        setShowConfirmation(true);
        setQst("Are you sure to finish this order ?");
        setTitle('Finish order');
    }
  
    const handleChangeStatus = (e) => {
        e.preventDefault();
        dispatch(ChangeStatus(selectedOrder, 'Finished', null)).then(() => {
          LoadData();
          setShowConfirmation(false);
        })
    }

    // Reload Data

    const LoadData = () => {
        dispatch(ListUsers());
        dispatch(ListOrders());
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

    if (loading || loadingOrders) {
        return ( <LoadingModule></LoadingModule> );
    } else if (error ||errorOrders) {
        return ( <MessageBox variant="danger">{error}</MessageBox> );
    } else {
        progressOrders = orders?.filter(order => order.status === 'In progress' && order.boosterId === userInfo._id);
        clients = users?.filter(user => user.rule === 'client');
        const myId = localStorage.getItem('myId') || false;
        const user = users?.find(u => u._id === myId);
        return (
            <Grid container spacing={3}>
                {/* Select Order */}
                <Grid item xs={12} md={4}>
                    <div className="myorder-select">
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                            <TableHead className="custom-thead">
                                <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {progressOrders.map((order) => (
                                <TableRow key={order._id} 
                                    className={selectedOrder === order._id ? 'mytablerow active' : 'mytablerow'} 
                                    onClick={() => setSelectedOrder(order._id)}>
                                    <TableCell>{Moment(order.createdAt).format('DD/MM/YY')}</TableCell>
                                    <TableCell>{clients.find(b => b._id === order.userId)?.name}</TableCell>
                                    <TableCell>   
                                        <button
                                            title={order.isPaused ? 'Order is paused by the user' : ''}
                                            disabled={order.isPaused ? true : false} 
                                            className={order.isPaused ? 'paid-button gray mr' : 'paid-button green mr'} 
                                            onClick={() => showFinishConfirmation(order._id)}>
                                                {order.isPaused ? 'Paused' : 'Finish'}
                                        </button>
                                        <button className="paid-button red"  onClick={() => showDeleteConfirmation(order._id)}>Drop</button>
                                    </TableCell>
                                 </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>
                {/* Order Informations */}
                <Grid item xs={12} md={4}>
                    <Paper className={classes.paper}>
                        {
                            progressOrders.find(order => order._id === selectedOrder) ? (
                                <div className="myorders-infos">
                                    <h4>
                                        {progressOrders.find(order => order._id === selectedOrder).boostType}
                                        &nbsp;for&nbsp;
                                        {((progressOrders.find(order => order._id === selectedOrder).price / 100) * user.percentage).toFixed(2)}&nbsp;$
                                    </h4>
                                    {
                                        progressOrders.find(order => order._id === selectedOrder).boostType === 'Rank Boosting' ? (
                                            <div className="myorders-rank">
                                                <div>
                                                    <img src={`/images/ranks/${ranks[progressOrders.find(order => order._id === selectedOrder).startRank - 1]}.png`} alt="Rank" />
                                                    <h3>
                                                        <span>{ranks[progressOrders.find(order => order._id === selectedOrder).startRank - 1]}</span>
                                                        <span>{divisions[progressOrders.find(order => order._id === selectedOrder).startDivision - 1]}</span>
                                                        <span className="mini-text">{ratingAmount[(progressOrders.find(order => order._id === selectedOrder).rankRating / 10) - 1]}</span>
                                                    </h3>
                                                </div>
                                                <div>
                                                    <ForwardIcon />
                                                </div>
                                                <div>
                                                    <img src={`/images/ranks/${ranks[progressOrders.find(order => order._id === selectedOrder).desiredRank - 1]}.png`} alt="Rank" />
                                                    <h3>
                                                        <span>{ranks[progressOrders.find(order => order._id === selectedOrder).desiredRank - 1]}</span>
                                                        <span>{divisions[progressOrders.find(order => order._id === selectedOrder).desiredDivision - 1]}</span>
                                                    </h3>
                                                </div>
                                            </div>
                                        ) : progressOrders.find(order => order._id === selectedOrder).boostType === 'Placement Boosting' ? (
                                            <div className="myorders-rank">
                                                <div>
                                                    <img src={`/images/ranks/${ranks[progressOrders.find(order => order._id === selectedOrder).desiredRank - 1]}.png`} alt="Rank" />
                                                    <h3>
                                                        <span>{ranks[progressOrders.find(order => order._id === selectedOrder).desiredRank - 1]}</span>
                                                        <span>{divisions[progressOrders.find(order => order._id === selectedOrder).desiredDivision - 1]}</span>
                                                    </h3>
                                                </div>
                                                <div>
                                                    <h5>{progressOrders.find(order => order._id === selectedOrder).games + ' Games'}</h5>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="myorders-rank">
                                                <div>
                                                    <img src={`/images/ranks/${ranks[progressOrders.find(order => order._id === selectedOrder).desiredRank - 1]}.png`} alt="Rank" />
                                                    <h3>
                                                        <span>{ranks[progressOrders.find(order => order._id === selectedOrder).desiredRank - 1]}</span>
                                                        <span>{divisions[progressOrders.find(order => order._id === selectedOrder).desiredDivision - 1]}</span>
                                                    </h3>
                                                </div>
                                                <div>
                                                    <h5>{progressOrders.find(order => order._id === selectedOrder).wins + ' Wins'}</h5>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="bordred-container">
                                        <div className="flex between">
                                            <span>Boost Queue</span><strong>{progressOrders.find(order => order._id === selectedOrder).duoGame ? 'Duo Boost' : 'Single Boost'}</strong>
                                        </div>
                                        <div className="flex between">
                                            <span>Server</span><strong>{progressOrders.find(order => order._id === selectedOrder).server}</strong>
                                        </div>
                                        <div className="flex between">
                                            <span>Specific Agents</span><strong>{progressOrders.find(order => order._id === selectedOrder).specificAgents ? 'Yes' : 'No'}</strong>
                                        </div>
                                        <div className="flex between">
                                            <span>Priority order</span><strong>{progressOrders.find(order => order._id === selectedOrder).priorityOrder ? 'Yes' : 'No'}</strong>
                                        </div>
                                        <div className="flex between">
                                            <span>With streaming</span><strong>{progressOrders.find(order => order._id === selectedOrder).withStreaming ? 'Yes' : 'No'}</strong>
                                        </div>
                                    </div>
                                    <div className="account-informations">
                                        <div>
                                            <span>Account</span>
                                            <p><strong>{accounts.find(acc => acc.userId === progressOrders.find(order => order._id === selectedOrder).userId)?.name}</strong></p>
                                        </div>
                                        <div>
                                            <span>Password</span>
                                            <p><strong>{accounts.find(acc => acc.userId === progressOrders.find(order => order._id === selectedOrder).userId)?.password}</strong></p>
                                        </div>
                                        <div>
                                            <span>Summoner Name</span>
                                            <p><strong>{accounts.find(acc => acc.userId === progressOrders.find(order => order._id === selectedOrder).userId)?.summoner}</strong></p>
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
                <Grid item xs={12} md={4}>
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
                                        progressOrders.map(order =>
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
                    qst={qst}
                    title={title}
                    onConfirm={e => {title === 'Drop order' ? deleteOrder(e) : handleChangeStatus(e)}} 
                    onClose={() => {setShowConfirmation(false)}}>
                </ConfirmModal>
            </Grid>
        )
    }
}
