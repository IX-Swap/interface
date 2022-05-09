import { Grid } from '@mui/material'
import { useWithdrawalAddressAdded } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddressAdded'
import { MyOrders } from 'app/pages/exchange/components/MyOrders/MyOrders'
import { PlaceOrderForm } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm'
import { useCurrencyBalance } from 'app/pages/exchange/hooks/useCurrencyBalance'
import { useMarketList } from 'app/pages/exchange/hooks/useMarketList'
import { useSymbol } from 'app/pages/exchange/hooks/useSymbol'
import { useTokenBalance } from 'app/pages/exchange/hooks/useTokenBalance'
import { PlaceOrderArgs } from 'app/pages/exchange/types/form'
import { useStyles } from 'app/pages/invest/components/Trading/TradingContainer.styles'
import { useActiveWeb3React } from 'hooks/blockchain/web3'
import React from 'react'
import { useParams } from 'react-router-dom'
import { PlaceOrderSuffix } from './PlaceOrderSuffix'

export const TradingBody = () => {
  const classes = useStyles()
  const { pairId } = useParams<{ pairId: string }>()
  const { data } = useMarketList()
  const { symbol } = useSymbol(pairId, data)
  const { data: tokenBalance } = useTokenBalance(pairId)
  const { account } = useActiveWeb3React()
  const isWhitelisted = useWithdrawalAddressAdded(account)
  const currencyName = symbol.split('/')[1]
  const tokenName = symbol.split('/')[0]

  const currencyBalance = useCurrencyBalance(currencyName)
  const submitForm = async (values: PlaceOrderArgs) => {
    console.log({ values })
    return await new Promise(resolve => resolve(undefined))
  }
  const isFetching = false
  const createOrderStatus = ''
  return (
    <Grid
      item
      container
      className={classes.wrapper}
      alignItems={'flex-start'}
      justifyContent='space-between'
      gap={3}
      xs={12}
    >
      <Grid item className={classes.colorGrid} xs={12} md={7}>
        <MyOrders />
      </Grid>

      <Grid item container xs={12} md={4}>
        <PlaceOrderForm
          createOrderStatus={createOrderStatus}
          isFetching={isFetching}
          currencyLabel={currencyName}
          tokenLabel={tokenName}
          currencyBalance={currencyBalance}
          suffix={
            <PlaceOrderSuffix isWhiteListed={isWhitelisted} account={account} />
          }
          tokenBalance={
            tokenBalance?.data !== undefined ? tokenBalance.data.amount : 0
          }
          onSubmit={submitForm}
        />
      </Grid>
    </Grid>
  )
}
