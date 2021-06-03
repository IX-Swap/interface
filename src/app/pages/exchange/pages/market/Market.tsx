import React from 'react'
import { PlaceOrderForm } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm'
import { Box, Grid } from '@material-ui/core'
import { MyOrders } from 'app/pages/exchange/components/MyOrders/MyOrders'
import { FinancialSummary } from 'app/pages/exchange/components/FinancialSummary/FinancialSummary'
import { useStyles } from 'app/pages/exchange/pages/market/Market.style'
import { InvestorLiveOrderBook } from 'app/pages/invest/components/InvestorLiveOrderBook/InvestorLiveOrderBook'
import { TVChartContainer } from 'app/pages/invest/components/TVChartContainer/TVChartContainer'
import { Trades } from 'app/pages/invest/components/Trades/Trades'
import { getDataFeed } from 'app/pages/invest/components/TVChartContainer/services/datafeed'
import {
  IBasicDataFeed,
  IChartingLibraryWidget
} from 'charting_library/charting_library'
import { useCustodianWalletSubmit } from 'app/pages/exchange/hooks/useCustodianWalletSubmit'
import { generatePath, Redirect, useParams } from 'react-router'
import { useMarketList } from 'app/pages/exchange/hooks/useMarketList'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import { GetWalletDialog } from '../../components/GetWalletDialog/GetWalletDialog'

export const Market = () => {
  const classes = useStyles()
  const { openDialog, setOpenDialog, submitForm } = useCustodianWalletSubmit()
  const [
    tvWidget,
    setTradingChart
  ] = React.useState<IChartingLibraryWidget | null>(null)
  const [datafeed] = React.useState<IBasicDataFeed>(() => getDataFeed())
  const { pairId } = useParams<{ pairId: string }>()
  const { data, isLoading } = useMarketList()

  if ((data === undefined || data.list.length < 1, isLoading)) {
    return null
  }

  if (pairId === null || pairId === undefined || pairId === ':pairId') {
    return (
      <Redirect
        to={generatePath(OTCMarketRoute.market, { pairId: data?.list[0]._id })}
      />
    )
  }

  return (
    <>
      <GetWalletDialog open={openDialog} toggleOpen={setOpenDialog} />
      <Box className={classes.container}>
        <Grid item xs={12} className={classes.colorGrid}>
          <FinancialSummary />
        </Grid>

        <Box my={2} />

        <Grid container direction={'column'} className={classes.wrapper}>
          <Grid item className={classes.colorGrid}>
            <InvestorLiveOrderBook currency='SGD' tokenSymbol='EUR' />
          </Grid>

          <Grid item container>
            <Grid item className={classes.middleBlock} xs={12}>
              <TVChartContainer
                tvWidget={tvWidget}
                setTradingChart={setTradingChart}
                datafeed={datafeed}
                symbol='EUR/SGD'
              />
            </Grid>
            <Grid item className={classes.colorGrid} xs={12}>
              <MyOrders />
            </Grid>
          </Grid>

          <Grid item container>
            <PlaceOrderForm
              currencyLabel={'SGD'}
              tokenLabel={'IXPS'}
              currencyBalance={15000}
              tokenBalance={300}
              onSubmit={submitForm}
            />
            <Trades />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
