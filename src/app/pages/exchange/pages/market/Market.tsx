import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { PlaceOrderForm } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm'
import { MyOrders } from 'app/pages/exchange/components/MyOrders/MyOrders'
import { FinancialSummary } from 'app/pages/exchange/components/FinancialSummary/FinancialSummary'
import { InvestorLiveOrderBook } from 'app/pages/exchange/components/InvestorLiveOrderBook/InvestorLiveOrderBook'
import { TVChartContainer } from 'app/pages/invest/components/TVChartContainer/TVChartContainer'
import { Trades } from 'app/pages/exchange/components/Trades/Trades'
import { getDataFeed } from 'app/pages/invest/components/TVChartContainer/services/datafeed'
import { IBasicDataFeed } from 'types/charting_library'
import { generatePath, Redirect, useParams } from 'react-router'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import { GetWalletDialog } from '../../components/GetWalletDialog/GetWalletDialog'
import {
  isMarketDataFalsy,
  isPairIdFalsy
} from 'app/pages/exchange/utils/order'
import { useCustodianWalletSubmit } from 'app/pages/exchange/hooks/useCustodianWalletSubmit'
import { useMarketList } from 'app/pages/exchange/hooks/useMarketList'
import { useStyles } from 'app/pages/exchange/pages/market/Market.style'
import { useSymbol } from '../../hooks/useSymbol'

export const Market = () => {
  const classes = useStyles()
  const { openDialog, setOpenDialog, submitForm } = useCustodianWalletSubmit()
  const [datafeed] = React.useState<IBasicDataFeed>(() => getDataFeed())
  const { pairId } = useParams<{ pairId: string }>()
  const { data, isLoading } = useMarketList()
  const { symbol } = useSymbol(pairId, data)

  if ((isMarketDataFalsy(data), isLoading)) {
    return null
  }

  if (isPairIdFalsy(pairId)) {
    return (
      <Redirect
        to={generatePath(OTCMarketRoute.market, { pairId: data?.list[0]._id })}
      />
    )
  }

  return (
    <>
      <Box className={classes.container}>
        <GetWalletDialog open={openDialog} toggleOpen={setOpenDialog} />
        <Grid item xs={12} className={classes.colorGrid}>
          <FinancialSummary />
        </Grid>

        <Grid item container>
          <Grid item className={classes.middleBlock} xs={12}>
            {symbol.length > 0 && (
              <TVChartContainer datafeed={datafeed} symbol={symbol} />
            )}
          </Grid>

          <Grid item container>
            <Grid item className={classes.middleBlock} xs={12}>
              {symbol.length > 0 && (
                <TVChartContainer datafeed={datafeed} symbol={symbol} />
              )}
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
