import React from 'react'
import { useStyles } from 'app/pages/exchange/pages/market/Market.styles'
import { Grid } from '@material-ui/core'
import { InvestorLiveOrderBook } from 'app/pages/exchange/components/InvestorLiveOrderBook/InvestorLiveOrderBook'
import { TVChartContainer } from 'app/pages/invest/components/TVChartContainer/TVChartContainer'
import { MyOrders } from 'app/pages/exchange/components/MyOrders/MyOrders'
import { IBasicDataFeed } from 'types/charting_library/charting_library'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { PlaceOrderForm } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm'
import { Trades } from 'app/pages/exchange/components/Trades/Trades'
import { PlaceOrderArgs } from 'app/pages/exchange/types/form'

export interface MarketViewProps {
  symbol: string
  datafeed?: IBasicDataFeed
  createOrderStatus: string
  isFetching: boolean
  currencyName: string
  tokenName: string
  currencyBalance: number
  tokenBalance: any
  submitForm: (bank: PlaceOrderArgs) => Promise<any>
}

export const MarketGridView = ({
  symbol,
  datafeed,
  createOrderStatus,
  isFetching,
  currencyName,
  tokenName,
  currencyBalance,
  tokenBalance,
  submitForm
}: MarketViewProps) => {
  const classes = useStyles()
  const { theme } = useAppBreakpoints()

  return (
    <Grid
      item
      container
      direction='column'
      className={classes.wrapper}
      alignItems={'flex-start'}
      xs={12}
    >
      <Grid
        item
        className={classes.colorGrid}
        style={{ height: '100%' }}
        xs={12}
      >
        <InvestorLiveOrderBook />
      </Grid>

      <Grid item container>
        <Grid item className={classes.middleBlock} xs={12}>
          {symbol.length > 0 && (
            <TVChartContainer
              data-testid={'tv-chart-container-data-test-id'}
              datafeed={datafeed}
              symbol={symbol}
              theme={theme.palette.type === 'dark' ? 'Dark' : 'Light'}
              toolbarBg={theme.palette.type === 'dark' ? '#292929' : ''}
              customCssUrl={'./trading-view_dark.css'}
            />
          )}
        </Grid>
        <Grid item className={classes.colorGrid} xs={12}>
          <MyOrders />
        </Grid>
      </Grid>

      <Grid item container xs={12}>
        <PlaceOrderForm
          createOrderStatus={createOrderStatus}
          isFetching={isFetching}
          currencyLabel={currencyName}
          tokenLabel={tokenName}
          currencyBalance={currencyBalance}
          tokenBalance={
            tokenBalance?.data !== undefined ? tokenBalance.data.amount : 0
          }
          onSubmit={submitForm}
        />
        <Trades />
      </Grid>
    </Grid>
  )
}
