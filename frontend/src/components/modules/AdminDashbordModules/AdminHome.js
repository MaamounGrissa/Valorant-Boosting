import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BoosterTab from './BoostersTab.js'
import BoosterAddModal from './BoosterAddModal.js';
import BoosterEditModal from './BoosterEditModal.js';
import { ListUsers } from '../../../actions/userActions';
import LoadingModule from '../LoadingModule.js';
import MessageBox from '../MessageBox.js';

export default function AdminHome(props) {
    let boosters;
    const dispatch = useDispatch();
    const { fixedHeightPaper, classes } = props;
    const userList = useSelector( state => state.userList);
    const {loading, error, users} = userList;
    const [selectedBooster, setSelectedBooster] = useState({})
    const [showAddBooster, setShowAddBooster] = useState(false);
    const [showEditBooster, setShowEditBooster] = useState(false);


    useEffect(() => {
        dispatch(ListUsers());
    }, [dispatch]);

    const handleCloseAddBooster = (e) => {
        e.preventDefault();
        dispatch(ListUsers());
        setShowAddBooster(false);
    }

    const handleOpenEditBooster = (boosterId) => {
        const booster = boosters?.find(b => b._id === boosterId);
        setSelectedBooster(booster);
        setShowEditBooster(true);
    }

    const handleCloseEditBooster = (e) => {
        e.preventDefault();
        dispatch(ListUsers());
        setShowEditBooster(false);
    }

    const LoadData = () => {
        dispatch(ListUsers());
    }

    if (loading) {
        return ( <LoadingModule></LoadingModule> );
    } else if (error) {
        return ( <MessageBox variant="danger">{error}</MessageBox> );
    } else {
        boosters = users?.filter(user => user.rule === 'booster');
        return (
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        Empty
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={5}>
                <Paper className={fixedHeightPaper}>
                        Empty
                </Paper>
                </Grid>
                {/* Booster */}
                <Grid item xs={12} md={7}>
                <Paper className={classes.paper}>
                        <div className="paper-header">
                            <div className="paper-title">Boosters</div>
                            <div className="button-container">
                                <button onClick={() => setShowAddBooster(true)}><AddCircleIcon /></button>
                            </div>
                        </div>
                        <div className="paper-content">
                            <BoosterTab onEdit={boosterId => handleOpenEditBooster(boosterId)} boosters={boosters} reloadData={() => LoadData()} />
                        </div>
                        <BoosterAddModal onClose={e => handleCloseAddBooster(e)} showAddBooster={showAddBooster} />
                        <BoosterEditModal onClose={e => handleCloseEditBooster(e)} showEditBooster={showEditBooster} booster={selectedBooster} />
                </Paper>
            </Grid>
        </Grid>
        )
    }
}
