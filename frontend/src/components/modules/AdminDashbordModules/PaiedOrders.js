import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOrder, ListOrders } from '../../../actions/orderActions.js';
import { ListUsers } from '../../../actions/userActions.js';
import LoadingModule from '../LoadingModule.js';
import MessageBox from '../MessageBox.js';
import ConfirmModal from './ConfirmModal.js';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});


export default function PaiedOrders(props) {
    let boosters, clients, paiedOrders;
    Moment.locale('en');
    const classes = useStyles();
    const dispatch = useDispatch();
    const userList = useSelector( state => state.userList);
    const {loading, error, users} = userList;
    const orderList = useSelector( state => state.orderList);
    const {loadingOrders, errorOrders, orders} = orderList;
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState('');

    const showDeleteConfirmation = (boosterId) => {
      setSelectedOrder(boosterId);
      setShowConfirmation(true);
    }

    const deleteOrder = (e) => {
        e.preventDefault();
        dispatch(DeleteOrder(selectedOrder)).then(() => {
            LoadData();
            setShowConfirmation(false);
        })
    }

     // Reload Data

     const LoadData = () => {
        dispatch(ListUsers());
        dispatch(ListOrders());
    }

    useEffect(() => {
        dispatch(ListUsers());
        dispatch(ListOrders());
    }, [dispatch]);


    if (loading || loadingOrders) {
        return ( <LoadingModule></LoadingModule> );
    } else if (error ||errorOrders) {
        return ( <MessageBox variant="danger">{error}</MessageBox> );
    } else {
        boosters = users?.filter(user => user.rule === 'booster');
        clients = users?.filter(user => user.rule === 'client');
        paiedOrders = orders?.filter(order => order.status === 'Paied');
        return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
            <TableHead className="custom-thead">
                <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Booster</TableCell>
                <TableCell>Percentage</TableCell>
                <TableCell>Booster price</TableCell>
                <TableCell>Rest</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {paiedOrders.map((order) => (
                <TableRow key={order._id}>
                    <TableCell component="th" scope="row">
                    {order._id.substring(order._id.length - 5)}
                    </TableCell>
                    <TableCell>{clients.find(b => b._id === order.userId).name}</TableCell>
                    <TableCell>{Moment(order.createdAt).format('DD/MM/YY')}</TableCell>
                    <TableCell>{order.price?.toLocaleString('en-US', {minimumIntegerDigits: 1,useGrouping: false})}&nbsp;$</TableCell>
                    <TableCell>{boosters.find(b => b._id === order.boosterId)?.name}</TableCell>
                    <TableCell>{boosters.find(b => b._id === order.boosterId)?.percentage}</TableCell>
                    <TableCell>{((order.price / 100) * boosters.find(b => b._id === order.boosterId)?.percentage)?.toLocaleString('en-US', {minimumIntegerDigits: 1,useGrouping: false})}&nbsp;$</TableCell>
                    <TableCell className="bold">{(order.price - ((order.price / 100) * boosters.find(b => b._id === order.boosterId)?.percentage))?.toLocaleString('en-US', {minimumIntegerDigits: 1,useGrouping: false})}&nbsp;$</TableCell>
                    <TableCell><span className="status-output paied">{order.status}</span></TableCell>
                    <TableCell><DeleteForeverIcon className="delete-btn" onClick={() => showDeleteConfirmation(order._id)} /></TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
            <ConfirmModal
                show={showConfirmation} 
                qst="Are you sure to delete order ?"
                title="Delete Order"
                onConfirm={e => deleteOrder(e)} 
                onClose={() => {setShowConfirmation(false)}}>
            </ConfirmModal>
        </TableContainer>
        );
    }
}