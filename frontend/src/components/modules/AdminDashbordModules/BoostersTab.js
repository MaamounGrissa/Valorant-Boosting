import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ConfirmModal from './ConfirmModal.js';
import { useDispatch } from 'react-redux';
import { DeleteBooster } from '../../../actions/userActions.js';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function BoostersTab(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { boosters } = props;
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedBooster, setSelectedBooster] = useState('');

    const showDeleteConfirmation = (boosterId) => {
      setSelectedBooster(boosterId);
      setShowConfirmation(true);
    }

    const deleteBooster = () => {
      console.log(selectedBooster)
      dispatch(DeleteBooster(selectedBooster)).then(() => {
        props.reloadData();
        setShowConfirmation(false);
      })
    }
 
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className="custom-thead">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Rank</TableCell>
              <TableCell>Paypal</TableCell>
              <TableCell>Percentage</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boosters.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.rank}</TableCell>
                <TableCell>{row.paypal}</TableCell>
                <TableCell>{row.percentage}&nbsp;%</TableCell>
                <TableCell align="right" className='admin-actions'>
                  <EditIcon onClick={() => props.onEdit(row._id)} />
                  <DeleteForeverIcon onClick={() => showDeleteConfirmation(row._id)} />
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ConfirmModal
                show={showConfirmation} 
                qst="Are you sure to delete booster ?"
                title="Delete Booster"
                onConfirm={deleteBooster} 
                onClose={() => {setShowConfirmation(false)}}>
            </ConfirmModal>
      </TableContainer>
    );
}