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
import ForwardIcon from '@material-ui/icons/Forward';

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});

export default function ProgressOrdersBooster(props) {
    const classes = useStyles();
    const { orders, clients, user } = props;

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

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className="custom-thead">
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Boost Type</TableCell>
              <TableCell>Queue</TableCell>
              <TableCell>Server</TableCell>
              <TableCell className="text-center">Boost</TableCell>
              <TableCell>Your Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id} 
                className={props.selectedOrder === order._id ? 'mytablerow active' : 'mytablerow'} 
                onClick={() => props.selectOrder(order._id)}>
                <TableCell>{Moment(order.createdAt).format('DD/MM/YY')}</TableCell>
                <TableCell>{clients.find(b => b._id === order.userId)?.name}</TableCell>
                <TableCell>{order.boostType}</TableCell>
                <TableCell>{order.duoGame ? 'Duo' : 'Solo'}</TableCell>
                <TableCell>{order.server}</TableCell>
                <TableCell>
                  <span className="nowrap">
                    {
                      order.boostType === "Rank Boosting" ? (
                          <span className="flex-align-center no-m j-fs">
                              <span className="cap">{ranks[order.startRank - 1]}</span>
                              <span>&nbsp;{divisions[order.startDivision - 1]}</span>
                          </span>
                      ) : order.boostType === "Placement Boosting" ? (
                          <span>{order.games}&nbsp;Games</span>
                      ) : (
                        <span>{order.wins}&nbsp;Wins</span>
                      )
                    }
                    <ForwardIcon />
                    <span className="flex-align-center no-m j-fs">
                        <span className="cap">{ranks[order.desiredRank - 1]}</span>
                        <span>&nbsp;{divisions[order.desiredDivision - 1]}</span>
                    </span>
                  </span>
                </TableCell>
                <TableCell>{((order.price / 100) * user.percentage).toFixed(2)}&nbsp;$</TableCell>
                <TableCell><button className="paid-button blue" onClick={() => props.onTake(order._id) }>Take</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}