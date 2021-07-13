import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from 'moment';
import ConfirmModal from '../ConfirmModal.js';
import { useDispatch } from 'react-redux';
import { ChangeStatus } from '../../../actions/orderActions.js';

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});


export default function FinishedOrders(props) {
    Moment.locale('en');
    const classes = useStyles();
    const dispatch = useDispatch();
    const { orders, boosters } = props;
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState('');

    const showChangeStatusConfirmation = (e, orderId) => {
      e.preventDefault();
      setSelectedOrder(orderId);
      setShowConfirmation(true);
    }
    
    const handleChangeStatus = (e) => {
        e.preventDefault();
        dispatch(ChangeStatus(selectedOrder, 'Paied', null)).then(() => {
          props.reloadData();
          setShowConfirmation(false);
        })
      }

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className="custom-thead">
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Boost</TableCell>
              <TableCell>Queue</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Summoner</TableCell>
              <TableCell>Booster</TableCell>
              <TableCell>Booster price</TableCell>
              <TableCell>Booster paypal</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell component="th" scope="row">
                  {order._id.substring(order._id.length - 5)}
                </TableCell>
                <TableCell>{order.boostType}</TableCell>
                <TableCell>{order.duoGame ? 'Duo Boost' : 'Solo Boost'}</TableCell>
                <TableCell>{Moment(order.createdAt).format('DD/MM/YY')}</TableCell>
                <TableCell>{order.price}&nbsp;$</TableCell>
                <TableCell>{order.summoner}</TableCell>
                <TableCell>{boosters.find(b => b._id === order.boosterId)?.name}</TableCell>
                <TableCell>{parseInt((order.price / 100) * boosters.find(b => b._id === order.boosterId)?.percentage)}&nbsp;$</TableCell>
                <TableCell>{boosters.find(b => b._id === order.boosterId)?.paypal}</TableCell>
                <TableCell><button className="paid-button" onClick={e => showChangeStatusConfirmation(e, order._id) }>Paid</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ConfirmModal
                show={showConfirmation} 
                qst="Are you sure to paid this order ?"
                title="Paid order"
                onConfirm={e => handleChangeStatus(e)} 
                onClose={() => {setShowConfirmation(false)}}>
        </ConfirmModal>
      </TableContainer>
    );
}