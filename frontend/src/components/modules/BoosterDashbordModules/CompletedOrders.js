import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import BoosterFinishedOrders from './BoosterFinishedOrders.js';
import BoosterPaiedOrders from './BoosterPaiedOrders.js';

export default function CompletedOrders(props) {
    const { classes} = props;
    return (
        <Grid container spacing={3}>
                {/* Finished Orders */}
                <Grid item xs={12}>
                    <Paper className={classes.paper} >
                        <BoosterFinishedOrders />
                    </Paper>
                </Grid>
                {/* Paied Orders */}
                <Grid item xs={12}>
                <Paper className={classes.paper} >
                        <BoosterPaiedOrders />
                    </Paper>
                </Grid>
               
            </Grid>
    )
}
