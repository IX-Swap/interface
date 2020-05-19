// @flow
import React, { useEffect, useRef } from 'react';
import { Typography, Grid, List, ListItem, Box } from '@material-ui/core';
import { Doughnut, Line } from 'react-chartjs-2';
import PersonalBalancesListModule from 'context/balance/personal';
import type { Balance } from 'context/balance/types';

import Actions from 'context/balance/personal/actions';

const {
  usePersonalBalancesListDispatch,
  usePersonalBalancesListState,
  PERSONAL_BALANCE_LIST_STATUS,
} = PersonalBalancesListModule;
const { getPersonalBalanceList, clearApiStatus } = Actions;

const useOverviewLogic = () => {
  const mountedRef = useRef(true);
  const pBDispatch = usePersonalBalancesListDispatch();
  const pBListState = usePersonalBalancesListState();
  const { status, page, limit, items } = pBListState;

  useEffect(() => {
    if (status === PERSONAL_BALANCE_LIST_STATUS.INIT) {
      getPersonalBalanceList(pBDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef,
      });
      clearApiStatus(pBDispatch);
    }
  }, [page, limit, status, pBDispatch]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    items,
  };
};

// demo data
const pieData = {
  datasets: [
    {
      data: [230000, 70000],
      backgroundColor: ['#FF6384', '#36A2EB'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB'],
    },
  ],
  labels: ['Cash', 'Digital Securities'],
};

const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Growth Over Time',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [230000, 260000, 240000, 280000, 300000],
    },
  ],
};

export default function Overview() {
  const { items: personalBalances } = useOverviewLogic();

  return (
    <Box m={4}>
      <Grid>
        <Typography align="right" variant="h4" gutterBottom>
          <b>Total: </b>$300,000 SGD
        </Typography>
        <Grid>
          <List component="nav" aria-label="secondary mailbox folders">
            {personalBalances &&
              // eslint-disable-next-line $$FlowFixMe
              personalBalances.map((balance: Balance) => (
                <ListItem button>
                  <b>{balance.name}: </b>&nbsp;&nbsp;&nbsp;{balance.balance} {balance.symbol}
                </ListItem>
              ))}
          </List>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Doughnut data={pieData} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Line data={lineData} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
