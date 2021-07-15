import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BoosterTab from './BoostersTab.js'
import WaitingOrders from './WaitingOrders.js'
import FinishedOrders from './FinishedOrders.js'
import BoosterAddModal from './BoosterAddModal.js';
import OrderAddModal from './OrderAddModal.js';
import BoosterEditModal from './BoosterEditModal.js';
import { ListUsers } from '../../../actions/userActions';
import { ChangeStatus, ListOrders } from '../../../actions/orderActions';
import LoadingModule from '../LoadingModule.js';
import MessageBox from '../MessageBox.js';
import ProgressOrders from './ProgressOrders.js'
import ConfirmModal from '../ConfirmModal.js';
import ChatModule from '../ChatModule.js'
import CachedIcon from '@material-ui/icons/Cached';
import { ListAccount } from '../../../actions/accountActions.js';

export default function AdminHome(props) {
    let boosters, clients, waitingOrders, progressOrders, finishedOrders;
    const dispatch = useDispatch();
    const { classes } = props;
    const userList = useSelector( state => state.userList);
    const {loading, error, users} = userList;
    const orderList = useSelector( state => state.orderList);
    const {loadingOrders, errorOrders, orders} = orderList;
    const accountList = useSelector( state => state.accountList);
    const { accounts } = accountList;
    const [selectedBooster, setSelectedBooster] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState({});
    const [showAddBooster, setShowAddBooster] = useState(false);
    const [showEditBooster, setShowEditBooster] = useState(false);
    const [showAddOrder, setShowAddOrder] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [reloadChat, setReloadChat] = useState(false);

    useEffect(() => {
        dispatch(ListUsers());
        dispatch(ListOrders());
        dispatch(ListAccount());
    }, [dispatch]);

    // BOOSTERS MODALS

    // Add Booster Modal -/Close

    const handleCloseAddBooster = (e) => {
        e.preventDefault();
        dispatch(ListUsers());
        setShowAddBooster(false);
    }

    // Edit Booster Modal Open/Close

    const handleOpenEditBooster = (boosterId) => {
        const booster = boosters?.find(b => b._id === boosterId);
        setSelectedBooster(booster);
        setShowEditBooster(true);
    }

    const handleCloseEditBooster = (e) => {
        e.preventDefault();
        dispatch(ListUsers());
        setShowEditBooster(false);
    }

    // ORDERS MODALS

    // Add Booster Modal -/Close

    const handleCloseAddOrder = (e) => {
        e.preventDefault();
        dispatch(ListOrders());
        setShowAddOrder(false);
    }

    const handleConfirmDropOrder = (orderId) => {
        setSelectedOrder(orderId);
        setShowConfirmation(true);
      }

    const handleChangeStatus = (e) => {
        e.preventDefault();
        dispatch(ChangeStatus(selectedOrder, 'Looking for a booster', '')).then(() => {
          LoadData();
          setShowConfirmation(false);
        })
      }

    // Reload Data

    const LoadData = () => {
        dispatch(ListUsers());
        dispatch(ListOrders());
        dispatch(ListAccount());
        setSelectedOrder(null)
    }

    if (loading || loadingOrders) {
        return ( <LoadingModule></LoadingModule> );
    } else if (error ||errorOrders) {
        return ( <MessageBox variant="danger">{error}</MessageBox> );
    } else {
        boosters = users?.filter(user => user.rule === 'booster');
        clients = users?.filter(user => user.rule === 'client');
        waitingOrders = orders?.filter(order => order.status === 'Looking for a booster');
        finishedOrders = orders?.filter(order => order.status === 'Finished');
        progressOrders = orders?.filter(order => order.status === 'In progress')

        return (
            <Grid container spacing={3}>
                {/* Finished Orders */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className="paper-header">
                            <div className="paper-title">Finished orders</div>
                        </div>
                        <div className="paper-content">
                            <FinishedOrders 
                                orders={finishedOrders} 
                                boosters={boosters} 
                                reloadData={() => LoadData()} />
                        </div>
                    </Paper>
                </Grid>
                {/* In Progress */}
                <Grid item xs={12} md={8}>
                    <Paper className={classes.paper}>
                        <div className="paper-header">
                            <div className="paper-title">In Progress orders</div>
                        </div>
                        <div className="paper-content">
                            <ProgressOrders 
                                selectOrder={orderId => setSelectedOrder(orderId)} 
                                onDrop={orderId => handleConfirmDropOrder(orderId)} 
                                orders={progressOrders} boosters={boosters} clients={clients}
                                reloadData={() => LoadData()} 
                                selectedOrder={selectedOrder}
                                />
                        </div>
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
                {/* Waiting Orders */}
                <Grid item xs={12} md={5}>
                    <Paper className={classes.paper}>
                        <div className="paper-header">
                            <div className="paper-title">Waiting orders</div>
                                <div className="button-container">
                                    <button onClick={() => setShowAddOrder(true)}><AddCircleIcon /></button>
                            </div>
                        </div>
                            <div className="paper-content">
                                <WaitingOrders clients={clients}
                                    onEdit={boosterId => handleOpenEditBooster(boosterId)} 
                                    orders={waitingOrders} 
                                    reloadData={() => LoadData()} />
                            </div>
                            <OrderAddModal onClose={e => handleCloseAddOrder(e)} showAddOrder={showAddOrder} clients={clients} accounts={accounts}/>
                            <BoosterEditModal onClose={e => handleCloseEditBooster(e)} showEditBooster={showEditBooster} booster={selectedBooster} />
                    </Paper>
                </Grid>
                {/* Booster */}
                <Grid item xs={12} md={7}>
                    <Paper className={classes.paper}>
                        <div className="paper-header">
                            <div className="paper-title">Boosters</div>
                            <div className="button-container">
                                <button onClick={() => setShowAddBooster(true)}><AddCircleIcon /></button>
                            </div>
                        </div>
                        <div className="paper-content">
                            <BoosterTab 
                                onEdit={boosterId => handleOpenEditBooster(boosterId)} 
                                boosters={boosters} reloadData={() => LoadData()} />
                        </div>
                        <BoosterAddModal onClose={e => handleCloseAddBooster(e)} showAddBooster={showAddBooster} />
                        <BoosterEditModal onClose={e => handleCloseEditBooster(e)} showEditBooster={showEditBooster} booster={selectedBooster} />
                    </Paper>
                </Grid>
                <ConfirmModal
                    show={showConfirmation} 
                    qst="Are you sure to drop this order ?"
                    title="Drop order"
                    onConfirm={e => handleChangeStatus(e)} 
                    onClose={() => {setShowConfirmation(false)}}>
                </ConfirmModal>
            </Grid>
        )
    }
}
