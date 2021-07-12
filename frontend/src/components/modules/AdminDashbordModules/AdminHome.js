import React, { useState, useEffect } from 'react';
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
import { ListOrders } from '../../../actions/orderActions';
import LoadingModule from '../LoadingModule.js';
import MessageBox from '../MessageBox.js';

export default function AdminHome(props) {
    let boosters, clients, waitingOrders, finishedOrders;
    const dispatch = useDispatch();
    const { classes } = props;
    const userList = useSelector( state => state.userList);
    const {loading, error, users} = userList;
    const orderList = useSelector( state => state.orderList);
    const {loadingOrders, errorOrders, orders} = orderList;
    const [selectedBooster, setSelectedBooster] = useState({})
    const [showAddBooster, setShowAddBooster] = useState(false);
    const [showEditBooster, setShowEditBooster] = useState(false);
    const [showAddOrder, setShowAddOrder] = useState(false);


    useEffect(() => {
        dispatch(ListUsers());
        dispatch(ListOrders());
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

    // Reload Data

    const LoadData = () => {
        dispatch(ListUsers());
        dispatch(ListOrders());
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
        return (
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className="paper-header">
                            <div className="paper-title">Finished orders</div>
                        </div>
                        <div className="paper-content">
                            <FinishedOrders onEdit={boosterId => handleOpenEditBooster(boosterId)} orders={finishedOrders} reloadData={() => LoadData()} />
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
                                <WaitingOrders onEdit={boosterId => handleOpenEditBooster(boosterId)} orders={waitingOrders} reloadData={() => LoadData()} />
                            </div>
                            <OrderAddModal onClose={e => handleCloseAddOrder(e)} showAddOrder={showAddOrder} clients={clients}/>
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
                            <BoosterTab onEdit={boosterId => handleOpenEditBooster(boosterId)} boosters={boosters} reloadData={() => LoadData()} />
                        </div>
                        <BoosterAddModal onClose={e => handleCloseAddBooster(e)} showAddBooster={showAddBooster} />
                        <BoosterEditModal onClose={e => handleCloseEditBooster(e)} showEditBooster={showEditBooster} booster={selectedBooster} />
                </Paper>
            </Grid>
        </Grid>
        )
    }
}
