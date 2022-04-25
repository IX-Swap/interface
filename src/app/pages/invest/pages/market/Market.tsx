import React, { useEffect, useState } from 'react'
import { Box, Grid, Hidden } from '@mui/material'
import { FinancialSummary } from 'app/pages/invest/components/FinancialSummary/FinancialSummary'
import { useStyles } from 'app/pages/invest/pages/market/Market.styles'
import { getDataFeed } from 'app/pages/invest/components/TVChartContainer/services/datafeed'
import { IBasicDataFeed } from 'charting_library'
import { generatePath, Redirect, useParams } from 'react-router-dom'
import { useMarketList } from 'app/pages/invest/hooks/useMarketList'
import { InvestRoute } from 'app/pages/invest/router/config'
import { GetWalletDialog } from 'app/pages/invest/components/GetWalletDialog/GetWalletDialog'
import { isMarketDataFalsy, isPairIdFalsy } from 'app/pages/invest/utils/order'
import { history } from 'config/history'

import { useCustodianWalletSubmit } from 'app/pages/invest/hooks/useCustodianWalletSubmit'
import { useSymbol } from 'app/pages/invest/hooks/useSymbol'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { useTokenBalance } from 'app/pages/invest/hooks/useTokenBalance'
import { DisclosureDialog } from 'app/pages/invest/components/DisclosureDialog/DisclosureDialog'
import { useGetSiteConfig } from 'app/pages/invest/hooks/useGetSiteConfig'
import { ExchangeRulesLink } from 'app/pages/invest/components/ExchangeRulesLink/ExchangeRulesLink'
import { MarketTabbedView } from 'app/pages/invest/components/Market/MarketTabbedView/MarketTabbedView'
import { MarketGridView } from 'app/pages/invest/components/Market/MarketGridView'
import { PlaceOrderFormDialog } from 'app/pages/invest/components/PlaceOrderForm/PlaceOrderFormDialog'
import { ExchangeDeactivatedDialog } from 'app/pages/invest/components/ExchangeDeactivatedDialog/ExchangeDeactivatedDialog'
import { isProdEnv } from 'config'

export const Market = () => {
  const [isDisclosureVisible, setIsDisclosureVisible] = useState<boolean>(false)
  const isOpenDeactivatedDialog = isProdEnv
  const toggleDeactivatedDialog = () => {
    history.push('/app')
  }
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
        ? generatePath(InvestRoute.exchange, {
            pairId: data?.list[0]?._id
          })
        : InvestRoute.exchange

    return <Redirect to={to} />
  }

  return (
    <Box className={classes.container}>
      <DisclosureDialog
        content={masDisclosure}
        isOpen={isDisclosureVisible && !isProdEnv}
      />
      <GetWalletDialog open={openDialog} toggleOpen={setOpenDialog} />
      <ExchangeDeactivatedDialog
        open={isOpenDeactivatedDialog}
        toggleOpen={toggleDeactivatedDialog}
      />
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
