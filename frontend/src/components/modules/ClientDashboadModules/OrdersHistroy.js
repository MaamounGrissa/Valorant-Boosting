import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LoadingModule from '../LoadingModule.js';
import MessageBox from '../MessageBox.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { MyListOrders } from '../../../actions/orderActions.js';

export default function ClientHome(props) {
    const dispatch = useDispatch();
    const { classes, theme } = props;

    const myId = localStorage.getItem('myId') || false;

    const myList = useSelector( state => state.myList);
    const {loadingOrders, errorOrders, myOrders} = myList;

    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (myId) {
            dispatch(MyListOrders(myId));
        }            
    }, [dispatch, myId]);


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

    if (loadingOrders) {
        return ( <LoadingModule></LoadingModule> );
    } else if (errorOrders) {
        return ( <MessageBox variant="danger">{errorOrders}</MessageBox> );
    } else {
        const myCompletedOrders = myOrders.filter(order => order.status === 'Finished' || order.status === 'Paied')
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className={theme ? "myorder-select client" : "myorder-select"}>
                        <h3>Orders History</h3>
                        <TableContainer component={Paper}>
                            <Table className={classes.table + 'client-table'} aria-label="simple table">
                            <TableHead className="custom-thead">
                                <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Boost Type</TableCell>
                                <TableCell>Queue</TableCell>
                                <TableCell align="center">Start Rank</TableCell>
                                <TableCell align="center">Desired Rank</TableCell>
                                <TableCell>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    myCompletedOrders.map(order =>
                                        <TableRow key={order._id} 
                                            className={selectedOrder === order._id ? 'mytablerow active' : 'mytablerow'} 
                                            onClick={() => setSelectedOrder(order._id)}>
                                            <TableCell>{Moment(order.createdAt).format('DD/MM/YY')}</TableCell>
                                            <TableCell>{order.boostType}</TableCell>
                                            <TableCell>{order.duoGame ? 'Duo Boost' : 'Single Boost'}</TableCell>
                                            <TableCell>
                                                {
                                                    order.boostType === "Rank Boosting" ? (
                                                        <span className="flex-align-center j-fs">
                                                            <img src={`/images/ranks/${ranks[order.startRank - 1]}.png`} alt="Rank" className="rank-icon" />
                                                            <span className="cap">{ranks[order.startRank - 1]}</span>
                                                            <span>&nbsp;{divisions[order.startDivision - 1]}</span>
                                                            <em>&nbsp;{ratingAmount[order.rankRating / 10]}</em>
                                                        </span>
                                                    ) : (
                                                        <span>{order.games}&nbsp;Games</span>
                                                    )
                                                }
                                            </TableCell>
                                            <TableCell>
                                                <span className="flex-align-center j-fs">
                                                    <img src={`/images/ranks/${ranks[order.desiredRank - 1]}.png`} alt="Rank" className="rank-icon" />
                                                    <span className="cap">{ranks[order.desiredRank - 1]}</span>
                                                    <span>&nbsp;{divisions[order.desiredDivision - 1]}</span>
                                                </span>
                                            </TableCell>
                                            <TableCell>{order.price.toFixed(2)}&nbsp;$</TableCell>

                                        </TableRow>
                                    )
                                }
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>              
            </Grid>
        )
    }
}
