import React, { useEffect, useState } from 'react'
import { Box, Grid, Hidden } from '@mui/material'
import { FinancialSummary } from 'app/pages/exchange/components/FinancialSummary/FinancialSummary'
import { useStyles } from 'app/pages/exchange/pages/market/Market.styles'
import { getDataFeed } from 'app/pages/invest/components/TVChartContainer/services/datafeed'
import { IBasicDataFeed } from 'charting_library'
import { generatePath, Redirect, useParams } from 'react-router-dom'
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
import { MarketTabbedView } from 'app/pages/exchange/components/Market/MarketTabbedView/MarketTabbedView'
import { MarketGridView } from 'app/pages/exchange/components/Market/MarketGridView'
import { PlaceOrderFormDialog } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderFormDialog'

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
    const firstPair = data.list[0]
    const to =
      firstPair !== undefined
        ? generatePath(OTCMarketRoute.market, { pairId: data?.list[0]?._id })
        : OTCMarketRoute.landing

    return <Redirect to={to} />
  }

  return (
    <Box className={classes.container}>
      <DisclosureDialog content={masDisclosure} isOpen={isDisclosureVisible} />
      <GetWalletDialog open={openDialog} toggleOpen={setOpenDialog} />
      <Grid item container xs={12} justifyContent='flex-end'>
        <ExchangeRulesLink />
      </Grid>
      <Box my={2} />
      <Grid item xs={12} className={classes.colorGrid}>
        <FinancialSummary />
      </Grid>

      <Grid item>
        <Box my={2} />
      </Grid>

      <Hidden lgDown>
        <Grid item xs={12}>
          <MarketGridView
            symbol={symbol}
            datafeed={datafeed}
            createOrderStatus={createOrderStatus}
            isFetching={isFetching}
            currencyName={currencyName}
            tokenName={tokenName}
            currencyBalance={currencyBalance}
            tokenBalance={tokenBalance}
            submitForm={submitForm}
          />
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <MarketTabbedView
          symbol={symbol}
          datafeed={datafeed}
          createOrderStatus={createOrderStatus}
          isFetching={isFetching}
          currencyName={currencyName}
          tokenName={tokenName}
          currencyBalance={currencyBalance}
          tokenBalance={tokenBalance}
          submitForm={submitForm}
        />
      </Hidden>
      <Hidden mdUp>
        <PlaceOrderFormDialog
          symbol={symbol}
          datafeed={datafeed}
          createOrderStatus={createOrderStatus}
          isFetching={isFetching}
          currencyName={currencyName}
          tokenName={tokenName}
          currencyBalance={currencyBalance}
          tokenBalance={tokenBalance}
          submitForm={submitForm}
        />
      </Hidden>
      <Hidden mdUp>
        <Grid item>
          <Box my={2} />
        </Grid>
      </Hidden>
    </Box>
  )
}
