// @flow
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { withRouter, useParams } from 'react-router-dom'
import Chart from 'kaktana-react-lightweight-charts'
import { Grid, CircularProgress, Paper } from '@material-ui/core'
import { subscribeToSocket } from 'services/socket'

// Local Components
import { ENDPOINT_URL } from 'config'
import OverviewHeader from './OverviewHeader'
import Monitoring from './components/Monitoring'
import BidsAsksHistory from './components/BidsAsksHistory'
import TradeHistory from './components/TradeHistory'
import BidsAsks from './components/BidsAsks'

// Table Component
import TableMyOrders from './components/MyOrders'

// Modules
import MarketActions from './modules/actions'
import Modules from './modules'

// Styles
import useStyles from './styles'

import { chartOptions } from './data'

const { MarketState, useMarketDispatch } = Modules

const ChartWithData = ({ id }: { id: string }) => {
  const {
    SUBSCRIBE_API: { CHART }
  } = ENDPOINT_URL
  const [series, setSeries] = useState([
    {
      data: []
    }
  ])

  useEffect(() => {
    const socket = subscribeToSocket()
    socket.emit(CHART.emit, id)
    socket.on(`${CHART.on}/${id}`, (data) => {
      setSeries([{ data }])
    })

    return () => {
      socket.off(`${CHART.on}/${id}`)
    }
  }, [id])

  return (
    <Chart
      options={chartOptions}
      candlestickSeries={series}
      autoWidth
      height={320}
    />
  )
}

const ChartMemoed = React.memo(({ id }: { id: string }) => (
  <ChartWithData id={id} />
))

function OverviewExchange () {
  const { id: tradingPairId } = useParams()
  const classes = useStyles()
  const dispatch = useMarketDispatch()
  const marketState = MarketState()
  const mountedRef = useRef(true)

  // eslint-disable-next-line no-unused-vars
  const { status, page, total, limit, items, statusCode, error } = marketState

  /*eslint-disable */
  useEffect(() => {
    MarketActions.getMarketList(dispatch, {
      skip: page * limit,
      limit,
      ref: mountedRef,
    });
  }, [page, limit, dispatch]);
  /*eslint-disable */

  const item = items.length && items.find(item => item._id === tradingPairId);

  return (
    <React.Fragment>
      {status !== "IDLE" ? (
        <CircularProgress size={50} />
      ) : (
        <Grid>
          <OverviewHeader data={item && item} />
          <Grid container spacing={1}>
            <Grid
              container
              item
              xs
              direction="column"
              className={classes.containerItem}
            >
              <BidsAsksHistory id={tradingPairId} />
            </Grid>
            <Grid
              container
              item
              xs={7}
              direction="column"
              className={classes.containerItem}
            >
              <section className={classes.graphContainer}>
                <Paper>
                  <div  style={{width: 'calc(100% - 8px)'}}>
                    <ChartMemoed id={tradingPairId} />
                  </div>
                </Paper>
              </section>
              <BidsAsks id={tradingPairId} items={items} />
            </Grid>
            <Grid
              container
              item
              xs
              direction="column"
              className={classes.containerItem}
            >
              <Monitoring type="marketList" data={items} />
              <TradeHistory id={tradingPairId} />
            </Grid>
          </Grid>
          <TableMyOrders id={tradingPairId} data={item && item} />
        </Grid>
      )}
    </React.Fragment>
  );
}

export default withRouter(OverviewExchange);
