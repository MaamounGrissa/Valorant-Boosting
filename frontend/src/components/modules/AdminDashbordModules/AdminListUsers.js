import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteBooster, ListUsers } from '../../../actions/userActions.js';
import LoadingModule from '../LoadingModule.js';
import MessageBox from '../MessageBox.js';
import ConfirmModal from '../ConfirmModal.js';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddUser from './AddUser.js';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});


export default function AdminListUsers(props) {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const userList = useSelector( state => state.userList);
    const {loading, error, users} = userList;
   
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [showAddUser, setShowAddUser] = useState(false);

   
    const selectEditUser = (userId) => {
        setSelectedUser(userId);
        setShowAddUser(true);
    }

    const handleCloseAddUser = () => {
        setShowAddUser(false);
        LoadData();
    }

    const handleOpenAddUser = () => {
        setSelectedUser(null);
        setShowAddUser(true);
    }

    const showDeleteConfirmation = (userId) => {
        setSelectedUser(userId);
        setShowConfirmation(true);
      }
  
      const deleteUser = () => {
        dispatch(DeleteBooster(selectedUser._id)).then(() => {
          LoadData();
          setShowConfirmation(false);
        })
      }

     // Reload Data

     const LoadData = () => {
        dispatch(ListUsers());
    }

    useEffect(() => {
        dispatch(ListUsers());
    }, [dispatch]);


    if (loading) {
        return ( <LoadingModule></LoadingModule> );
    } else if (error) {
        return ( <MessageBox variant="danger">{error}</MessageBox> );
    } else {
        return (
            <Grid container >
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                            <div className="paper-content">
                            <TableContainer component={Paper}>
                            <div className="paper-header">
                                <h3 className="mytitle">List Users</h3>
                                <div className="button-container">
                                    <button onClick={() => handleOpenAddUser()}><AddCircleIcon /></button>
                                </div>
                            </div>
                            <Table className={classes.table} aria-label="simple table">
                            <TableHead className="custom-thead">
                                <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Paypal</TableCell>
                                <TableCell>Percentage</TableCell>
                                <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.rule}</TableCell>
                                    <TableCell>{user.paypal}</TableCell>
                                    <TableCell>{user.percentage}</TableCell>
                                    <TableCell className='admin-actions'>
                                        <EditIcon onClick={() => selectEditUser(user)} />
                                        <DeleteForeverIcon onClick={() => showDeleteConfirmation(user)} />
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                            <ConfirmModal
                                show={showConfirmation} 
                                qst="Are you sure to delete user ?"
                                title="Delete User"
                                onConfirm={e => deleteUser(e)} 
                                onClose={() => {setShowConfirmation(false)}}>
                            </ConfirmModal>
                        </TableContainer>
                            </div>
                            <AddUser onClose={e => handleCloseAddUser(e)} showAddUser={showAddUser} user={selectedUser} />
                    </Paper>
                </Grid>
        </Grid>
        
        );
    }
}