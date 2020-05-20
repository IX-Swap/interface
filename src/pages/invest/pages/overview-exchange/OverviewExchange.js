import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Typography, Paper } from '@material-ui/core';

import OverviewHeader from './OverviewHeader';
import Monitoring from './Monitoring';
import TableOrders from './TableOrders';

import useStyles from './styles';

function OverviewExchange() {
  const classes = useStyles();

  return (
    <Grid>
      <OverviewHeader />
      <Grid container spacing={1}>
        <Grid item xs direction="column">
          <Monitoring />
          <Monitoring />
        </Grid>
        <Grid item xs={6} direction="column">
          <Paper className={classes.paper}>
            {
              // TODO: PLACEHOLDER FOR THE CHART
            }
          </Paper>
          <Paper className={classes.paper}>
            {
              // TODO: PLACEHOLDER FOR THE BUY/SELL OPTIONS
            }
          </Paper>
        </Grid>
        <Grid item xs direction="column">
          <Monitoring />
          <Monitoring />
        </Grid>
      </Grid>
      <Typography className={classes.tableTitle} variant="h3">
        Open Orders
      </Typography>
      <TableOrders />
    </Grid>
  );
}

export default withRouter(OverviewExchange);
