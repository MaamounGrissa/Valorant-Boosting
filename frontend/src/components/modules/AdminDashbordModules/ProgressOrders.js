import React from 'react';
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


export default function ProgressOrders(props) {
    const classes = useStyles();
    const { orders, clients, boosters } = props;

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className="custom-thead">
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Booster</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id} 
                className={props.selectedOrder === order._id ? 'mytablerow active' : 'mytablerow'} 
                onClick={() => props.selectOrder(order._id)}>
                <TableCell component="th" scope="row">
                  {
                    order.isPaused ? (
                      <span className="paused">Paused</span>
                    ) : (
                      <span>{order._id.substring(order._id.length - 5)}</span>
                    )
                  }
                  
                </TableCell>
                <TableCell>{clients.find(user => user._id === order.userId)?.name}</TableCell>
                <TableCell>{parseInt(order.price)}&nbsp;$</TableCell>
                <TableCell>{boosters.find(b => b._id === order.boosterId)?.name}</TableCell>
                <TableCell><span className="status-output progress">{order.status}</span></TableCell>
                <TableCell><button className="paid-button red" onClick={() => props.onDrop(order._id) }>Drop</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}