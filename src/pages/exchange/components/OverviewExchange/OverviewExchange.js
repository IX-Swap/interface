import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import TradingViewWidget from 'react-tradingview-widget';
import { Grid } from '@material-ui/core';

// Local Components
import OverviewHeader from './OverviewHeader';
import Monitoring from './components/Monitoring';
import BidsAsksHistory from './components/BidsAsksHistory';
import TradeHistory from './components/TradeHistory';
import BidsAsks from './components/BidsAsks';

// Table Component
import TableMyOrders from './components/MyOrders';

// Modules
import MarketActions from './modules/actions';
import Modules from './modules';

// Styles
import useStyles from './styles';

const {
  MarketState,
  useMarketDispatch,
} = Modules;

function OverviewExchange() {
  const classes = useStyles();
  const dispatch = useMarketDispatch();
  const marketState = MarketState();
  const mountedRef = useRef(true);

  const {
    status,
    page,
    total,
    limit,
    items,
    statusCode,
    error,
  } = marketState;

  useEffect(() => {
    MarketActions.getMarketList(dispatch, {
      skip: page * limit,
      limit,
      ref: mountedRef,
    });
  }, [page, limit, dispatch]);
  console.log('classes.graphContainer', classes.graphContainer);
  return (
    <Grid>
      {true && <OverviewHeader />}
      <Grid container spacing={1}>
        <Grid container item xs direction="column">
          <BidsAsksHistory />
        </Grid>
        <Grid container item xs={7} direction="column">
          <section className={classes.graphContainer}>
            <TradingViewWidget
              symbol="NASDAQ:AAPL"
              locale="fr"
              autosize
            />
          </section>
          <BidsAsks />
        </Grid>
        <Grid container item xs direction="column">
          <Monitoring type="marketList" data={items} />
          <TradeHistory />
        </Grid>
      </Grid>
      
      <TableMyOrders />
    </Grid>
  );
}
  
export default withRouter(OverviewExchange);
