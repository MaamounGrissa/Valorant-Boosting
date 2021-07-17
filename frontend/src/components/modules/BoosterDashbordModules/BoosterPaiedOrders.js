import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from 'moment';
import LoadingModule from '../LoadingModule.js';
import MessageBox from '../MessageBox.js';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});


export default function BoosterPaiedOrders(props) {
    let user, clients, paiedOrders;
    Moment.locale('en');
    const classes = useStyles();
    const userList = useSelector( state => state.userList);
    const {loading, error, users} = userList;
    const orderList = useSelector( state => state.orderList);
    const {loadingOrders, errorOrders, orders} = orderList;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

  

    if (loading || loadingOrders) {
        return ( <LoadingModule></LoadingModule> );
    } else if (error ||errorOrders) {
        return ( <MessageBox variant="danger">{error}</MessageBox> );
    } else {
        user = users?.find(user => user._id === userInfo._id);
        clients = users?.filter(user => user.rule === 'client');
        paiedOrders = orders?.filter(order => order.status === 'Paied' && order.boosterId === userInfo._id );
        return (
        <TableContainer component={Paper}>
            <span className="myorders-title">My Paied Orders</span>
            <Table className={classes.table} aria-label="simple table">
            <TableHead className="custom-thead">
                <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Boost Type</TableCell>
                <TableCell>Boost Queue</TableCell>
                <TableCell>My Price</TableCell>
                <TableCell>Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {paiedOrders.map((order) => (
                <TableRow key={order._id}>
                    <TableCell component="th" scope="row">
                    {order._id.substring(order._id.length - 5)}
                    </TableCell>
                    <TableCell>{Moment(order.createdAt).format('DD/MM/YY')}</TableCell>
                    <TableCell>{clients.find(b => b._id === order.userId).name}</TableCell>
                    <TableCell>{order.boostType}</TableCell>
                    <TableCell>{order.duoGame ? 'Duo Boost' : 'Single Boost'}</TableCell>
                    <TableCell>{(((order.price / 100) * user.percentage)).toFixed(2)}&nbsp;$</TableCell>
                    <TableCell><span className="status-output paied">{order.status}</span></TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        );
    }
}