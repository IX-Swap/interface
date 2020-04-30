import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

import Market from 'pages/exchange/components/Market'
import Balances from 'pages/exchange/components/Balances'
import Orders from 'pages/exchange/components/Orders'
import PriceChart from 'pages/exchange/components/PriceChart'
import Diligence from 'pages/exchange/components/Diligence'
import Orderbook from 'pages/exchange/components/Orderbook'
import Markets from 'pages/exchange/components/Markets'
import Trades from 'pages/exchange/components/Trades'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 20
  },
  market: {
    minWidth: 300,
    minHeight: 300
  },
  balance: {
    minWidth: 300,
    minHeight: 300
  },
  orders: {
    minWidth: 300,
    minHeight: 300
  },
  priceChart: {
    minWidth: 300,
    minHeight: 300
  },
  dilligence: {
    minWidth: 300,
    minHeight: 300
  },
  orderbook: {
    minWidth: 300,
    minHeight: 300
  },
  markets: {
    minWidth: 300,
    minHeight: 300
  },
  trades: {
    minWidth: 300,
    minHeight: 300
  }
}))
function Exchange (props) {
  const classes = useStyles()
  return (
    <Grid container spacing={3}>
      <Grid item sm={12} md={5} lg={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={12} lg={12} className={classes.market}>
            <Market />
          </Grid>
          <Grid item xs={12} sm={6} md={12} lg={12} className={classes.balance}>
            <Balances />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.orders}>
            <Orders />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} md={7} lg={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} className={classes.priceChart}>
            <PriceChart />
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={classes.dilligence}>
            <Diligence />
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={classes.orderbook}>
            <Orderbook />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} md={12} lg={4}>
        <Grid container spacing={3}>
          <Grid xs={12} item md={6} lg={12} className={classes.markets}>
            <Markets />
          </Grid>
          <Grid xs={12} item md={6} lg={12} className={classes.trades}>
            <Trades />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withRouter(Exchange)
