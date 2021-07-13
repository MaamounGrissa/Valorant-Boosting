import React from 'react';
import Moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});


export default function ProgressOrdersBooster(props) {
    const classes = useStyles();
    const { orders, clients, user } = props;

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className="custom-thead">
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Boost Type</TableCell>
              <TableCell>Queue</TableCell>
              <TableCell>Server</TableCell>
              <TableCell>Your Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id} 
                className={props.selectedOrder === order._id ? 'mytablerow active' : 'mytablerow'} 
                onClick={() => props.selectOrder(order._id)}>
                <TableCell>{order._id.substring(order._id.length - 5)}</TableCell>
                <TableCell>{Moment(order.createdAt).format('DD/MM/YY')}</TableCell>
                <TableCell>{clients.find(b => b._id === order.userId)?.name}</TableCell>
                <TableCell>{order.boostType}</TableCell>
                <TableCell>{order.duoGame ? 'Duo Boost' : 'Solo Boost'}</TableCell>
                <TableCell>{order.server}</TableCell>
                <TableCell>{parseInt((order.price / 100) * user.percentage)}&nbsp;$</TableCell>
                <TableCell><button className="paid-button blue" onClick={() => props.onTake(order._id) }>Take</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}