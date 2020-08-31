import React from 'react'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

import Balances from 'v1/pages/dashboard/components/Balances'
import ExchangeStats from 'v1/pages/dashboard/components/ExchangeStats'
import Markets from 'v1/pages/dashboard/components/Markets'
import NewsFeed from 'v1/pages/dashboard/components/NewsFeed'
import OpenOrders from 'v1/pages/dashboard/components/OpenOrders'
import Trades from 'v1/pages/dashboard/components/Trades'
import Transactions from 'v1/pages/dashboard/components/Transactions'
import BlockchainData from 'v1/pages/dashboard/components/BlockchainData'

function Dashboard (props) {
  // TODO: Rendering of each component for the <Grid>
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
