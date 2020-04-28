import React from 'react'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

import Balances from 'pages/dashboard/components/Balances'
import ExchangeStats from 'pages/dashboard/components/ExchangeStats'
import Markets from 'pages/dashboard/components/Markets'
import NewsFeed from 'pages/dashboard/components/NewsFeed'
import OpenOrders from 'pages/dashboard/components/OpenOrders'
import Trades from 'pages/dashboard/components/Trades'
import Transactions from 'pages/dashboard/components/Transactions'
import BlockchainData from 'pages/dashboard/components/BlockchainData'

function Dashboard (props) {
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Balances />
      </Grid>
      <Grid item>
        <Markets />
      </Grid>
      <Grid item>
        <NewsFeed />
      </Grid>
      <Grid item>
        <OpenOrders />
      </Grid>
      <Grid item>
        <Transactions />
      </Grid>
      <Grid item>
        <BlockchainData />
      </Grid>
      <Grid item>
        <Trades />
      </Grid>
      <Grid item>
        <ExchangeStats />
      </Grid>
      <Grid item>
        <BlockchainData />
      </Grid>
    </Grid>
  )
}

export default withRouter(Dashboard)
