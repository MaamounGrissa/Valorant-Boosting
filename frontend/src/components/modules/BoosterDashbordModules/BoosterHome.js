import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ListUsers } from '../../../actions/userActions';
import { ChangeStatus, ListOrders } from '../../../actions/orderActions';
import LoadingModule from '../LoadingModule.js';
import MessageBox from '../MessageBox.js';
import ProgressOrdersBooster from './ProgressOrdersBooster.js'
import ConfirmModal from '../ConfirmModal.js';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function BoosterHome(props) {
    let user, clients, watingOrders, finishedOrders, paiedOrders;
    const dispatch = useDispatch();
    const { classes } = props;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userList = useSelector( state => state.userList);
    const {loading, error, users} = userList;
    const orderList = useSelector( state => state.orderList);
    const {loadingOrders, errorOrders, orders} = orderList;
    const [selectedOrder, setSelectedOrder] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        dispatch(ListUsers());
        dispatch(ListOrders());
    }, [dispatch]);

    // BOOSTERS MODALS

    const handleConfirmDropOrder = (orderId) => {
        setSelectedOrder(orderId);
        setShowConfirmation(true);
      }

    const handleTakeOrder = (e) => {
        e.preventDefault();
        dispatch(ChangeStatus(selectedOrder, 'In progress', userInfo._id)).then(() => {
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

    if (loading || loadingOrders) {
        return ( <LoadingModule></LoadingModule> );
    } else if (error ||errorOrders) {
        return ( <MessageBox variant="danger">{error}</MessageBox> );
    } else {
        user = users?.find(user => user._id === userInfo._id);
        paiedOrders = orders?.filter(order => order.status === 'Paied' && order.boosterId === user._id);
        finishedOrders = orders?.filter(order => order.status === 'Finished' && order.boosterId === user._id);
        clients = users?.filter(user => user.rule === 'client');
        watingOrders = orders?.filter(order => order.status === 'Looking for a booster' && !order.isPaused);

        return (
            <Grid container spacing={3}>
                {/* Booster Infos */}
                <Grid item xs={12}>
                    <div className="booster-panel-infos">
                        <div className="booster-infos-box">
                            <div className="icon-container">
                                <MonetizationOnIcon />
                            </div>
                            <div className="infos-container">
                                <p><strong>Total Paied Orders : </strong><span>{
                                    paiedOrders.length
                                    }</span></p>
                                <p><strong>Total Revenue : </strong><span>{user.totalRevenue.toFixed(2)}&nbsp;$</span></p>
                            </div>
                        </div>
                        <div className="booster-infos-box">
                            <div className="icon-container">
                                <CheckCircleIcon />
                            </div>
                            <div className="infos-container">
                                <p><strong>Total Finished Orders : </strong><span>{
                                    finishedOrders.length
                                    }</span></p>
                                <p><strong>Payement Pending : </strong><span>{user.payementPending.toFixed(2)}&nbsp;$</span></p>
                            </div>
                        </div>
                    </div>
                </Grid>
                {/* In Progress */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className="paper-header">
                            <div className="paper-title">New orders</div>
                        </div>
                        <div className="paper-content">
                            <ProgressOrdersBooster
                                selectOrder={orderId => setSelectedOrder(orderId)} 
                                onTake={orderId => handleConfirmDropOrder(orderId)} 
                                orders={watingOrders} clients={clients}
                                user={user}
                                reloadData={() => LoadData()} 
                                selectedOrder={selectedOrder}
                            />
                        </div>
                    </Paper>
                </Grid>
                <ConfirmModal
                    show={showConfirmation} 
                    qst="Are you sure to take this order ?"
                    title="Take order"
                    onConfirm={e => handleTakeOrder(e)} 
                    onClose={() => {setShowConfirmation(false)}}>
                </ConfirmModal>
            </Grid>
        )
    }
}
