import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

import Market from 'v1/pages/exchange/components/Market'
import Balances from 'v1/pages/exchange/components/Balances'
import Orders from 'v1/pages/exchange/components/Orders'
import PriceChart from 'v1/pages/exchange/components/PriceChart'
import Diligence from 'v1/pages/exchange/components/Diligence'
import Orderbook from 'v1/pages/exchange/components/Orderbook'
import Markets from 'v1/pages/exchange/components/Markets'
import Trades from 'v1/pages/exchange/components/Trades'
import useStyles from 'v1/pages/exchange/styles'
import useMockExchangeData from '../../mock/data'

function Exchange (props) {
  const { state, market, setMarket } = useExchangeLogic()

  const classes = useStyles()
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={5} lg={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.market}>
            <Market state={state} market={market} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={classes.markets}>
            <Markets state={state} setMarket={setMarket} />
          </Grid>
          <Grid xs={12} item md={12} lg={12} className={classes.balances}>
            <Balances state={state} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} md={7} lg={5}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} className={classes.dilligence}>
            <Diligence state={state} market={market} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={classes.priceChart}>
            <PriceChart series={state.markets[market].series} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={classes.orderbook}>
            <Orderbook book={state.markets[market].orderbook} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} md={12} lg={4}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.orders}>
            <Orders />
          </Grid>
          <Grid item xs={12} md={12} lg={12} className={classes.trades}>
            <Trades trades={state.markets[market].trades} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

function useExchangeLogic () {
  const [market, setMarket] = useState('IXPS:SGD')
  const { state } = useMockExchangeData()

  return { state, market, setMarket }
}
export default withRouter(Exchange)
