import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default function HomeTab(props) {
    const { fixedHeightPaper, classes } = props;

    return (
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                    Empty
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
                    Empty
            </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
            <Paper className={classes.paper}>
                    Empty
            </Paper>
            </Grid>
      </Grid>
    )
}
