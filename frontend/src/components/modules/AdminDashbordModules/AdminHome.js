import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BoosterTab from './BoostersTab.js'
import BoosterAddModal from './BoosterAddModal.js';
import { ListUsers } from '../../../actions/userActions';
import LoadingModule from '../LoadingModule.js';
import MessageBox from '../MessageBox.js';

export default function AdminHome(props) {
    const dispatch = useDispatch();
    const { fixedHeightPaper, classes } = props;
    const userList = useSelector( state => state.userList);
    const {loading, error, users} = userList;
    const [showBooster, setShowBooster] = useState(false);

    useEffect(() => {
        dispatch(ListUsers());
    }, [dispatch]);

    const handleCloseBooster = (e) => {
        e.preventDefault();
        dispatch(ListUsers());
        setShowBooster(false);
    }

    if (loading) {
        return ( <LoadingModule></LoadingModule> );
    } else if (error) {
        return ( <MessageBox variant="danger">{error}</MessageBox> );
    } else {
        const boosters = users?.filter(user => user.rule === 'booster');
        return (
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={fixedHeightPaper}>
                        Empty
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={4}>
                <Paper className={fixedHeightPaper}>
                        Empty
                </Paper>
                </Grid>
                {/* Booster */}
                <Grid item xs={8}>
                <Paper className={classes.paper}>
                        <div className="paper-header">
                            <div className="paper-title">Boosters</div>
                            <div className="button-container">
                                <button onClick={() => setShowBooster(true)}><AddCircleIcon /></button>
                            </div>
                        </div>
                        <div className="paper-content">
                            <BoosterTab boosters={boosters} />
                        </div>
                        <BoosterAddModal onClose={e => handleCloseBooster(e)} showBooster={showBooster} />
                </Paper>
                </Grid>
        </Grid>
        )
    }
}
