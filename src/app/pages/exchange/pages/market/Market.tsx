import React, { useEffect, useState } from 'react'
import { PlaceOrderForm } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm'
import { Box, Grid } from '@material-ui/core'
import { MyOrders } from 'app/pages/exchange/components/MyOrders/MyOrders'
import { FinancialSummary } from 'app/pages/exchange/components/FinancialSummary/FinancialSummary'
import { useStyles } from 'app/pages/exchange/pages/market/Market.style'
import { InvestorLiveOrderBook } from 'app/pages/exchange/components/InvestorLiveOrderBook/InvestorLiveOrderBook'
import { TVChartContainer } from 'app/pages/invest/components/TVChartContainer/TVChartContainer'
import { Trades } from 'app/pages/exchange/components/Trades/Trades'
import { getDataFeed } from 'app/pages/invest/components/TVChartContainer/services/datafeed'
import { IBasicDataFeed } from 'types/charting_library'
import { generatePath, Redirect, useParams } from 'react-router'
import { useMarketList } from 'app/pages/exchange/hooks/useMarketList'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import { GetWalletDialog } from '../../components/GetWalletDialog/GetWalletDialog'
import {
  isMarketDataFalsy,
  isPairIdFalsy
} from 'app/pages/exchange/utils/order'
import { useCustodianWalletSubmit } from 'app/pages/exchange/hooks/useCustodianWalletSubmit'
import { useSymbol } from '../../hooks/useSymbol'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { useTokenBalance } from 'app/pages/exchange/hooks/useTokenBalance'
import { DisclosureDialog } from 'app/pages/exchange/components/DisclosureDialog/DisclosureDialog'
import { useGetSiteConfig } from 'app/pages/exchange/hooks/useGetSiteConfig'
import { ExchangeRulesLink } from 'app/pages/exchange/components/ExchangeRulesLink/ExchangeRulesLink'

export const Market = () => {
  const [isDisclosureVisible, setIsDisclosureVisible] = useState<boolean>(false)
  const { data: config } = useGetSiteConfig()
  const hasAcceptedMasDisclosure =
    config !== undefined ? config.hasAcceptedMasDisclosure : false
  const masDisclosure = config !== undefined ? config.masDisclosure : ''

  useEffect(() => {
    if (!hasAcceptedMasDisclosure) {
      setIsDisclosureVisible(true)
    } else {
      setIsDisclosureVisible(false)
    }
  }, [hasAcceptedMasDisclosure, setIsDisclosureVisible])

  const classes = useStyles()
  const {
    openDialog,
    setOpenDialog,
    submitForm,
    isFetching,
    createOrderStatus
  } = useCustodianWalletSubmit()
  const [datafeed] = React.useState<IBasicDataFeed>(() => getDataFeed())
  const { pairId } = useParams<{ pairId: string }>()
  const { data, isLoading } = useMarketList()
  const { symbol } = useSymbol(pairId, data)
  const { data: tokenBalance } = useTokenBalance(pairId)

  const currencyName = symbol.split('/')[1]
  const tokenName = symbol.split('/')[0]

  const { list } = useVirtualAccount()
  const virtualAccount =
    list !== undefined
      ? list.find(
          (item: { currency: string }) => item.currency === currencyName
        )
      : undefined
  const currencyBalance =
    virtualAccount !== undefined ? virtualAccount.balance.outstanding : 0

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
    <Box className={classes.container}>
      <DisclosureDialog content={masDisclosure} isOpen={isDisclosureVisible} />
      <GetWalletDialog open={openDialog} toggleOpen={setOpenDialog} />
      <Grid item container xs={12} justify='flex-end'>
        <ExchangeRulesLink />
      </Grid>
      <Box my={2} />
      <Grid item xs={12} className={classes.colorGrid}>
        <FinancialSummary />
      </Grid>

      <Box my={2} />

      <Grid
        container
        direction={'column'}
        className={classes.wrapper}
        alignItems={'flex-start'}
      >
        <Grid item className={classes.colorGrid} style={{ height: '100%' }}>
          <InvestorLiveOrderBook />
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
    </Box>
  )
}
