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
      {false && <OverviewHeader />}
      <Grid container spacing={1}>
        <Grid container item xs direction="column">
          <Monitoring />
          <Monitoring />
        </Grid>
        <Grid container item xs={6} direction="column">
          <Paper className={classes.paper}>
              TODO: PLACEHOLDER FOR THE CHART
          </Paper>
          <Paper className={classes.paper}>
              TODO: PLACEHOLDER FOR THE BUY/SELL OPTIONS
          </Paper>
        </Grid>
        <Grid container item xs direction="column">
          <Monitoring />
          <Monitoring title="Trade History" />
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
