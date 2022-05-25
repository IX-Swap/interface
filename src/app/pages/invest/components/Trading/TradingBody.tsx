import { Grid } from '@mui/material'
import { useWithdrawalAddressAdded } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddressAdded'
import { PlaceOrderForm } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm'
import { useCurrencyBalance } from 'app/pages/exchange/hooks/useCurrencyBalance'
import { useTokenBalance } from 'app/pages/exchange/hooks/useTokenBalance'
import { PlaceOrderArgs } from 'app/pages/exchange/types/form'
import { useStyles } from 'app/pages/invest/components/Trading/TradingContainer.styles'
import { useActiveWeb3React } from 'hooks/blockchain/web3'
import React from 'react'
import { useParams } from 'react-router-dom'
import {
  orderPayloadtoOTCAdapt,
  useCreateOTCOrder
} from 'app/pages/invest/hooks/useCreateOTCOrder'
import { useFeaturedPair } from 'app/pages/invest/hooks/useFeaturedPair'
import { TradingOrders } from 'app/pages/invest/components/Trading/Orders/TradingOrders'
import { PlaceOrderSuffix } from 'app/pages/invest/components/Trading/PlaceOrderSuffix'

export const TradingBody = () => {
  const classes = useStyles()
  const { pairId } = useParams<{ pairId: string }>()
  const { data: pair } = useFeaturedPair()
  const symbol = pair?.name ?? ''
  const { data: tokenBalance } = useTokenBalance(pairId)
  const { account } = useActiveWeb3React()
  const isWhitelisted = useWithdrawalAddressAdded(account)
  const currencyName = symbol.split('/')[1]
  const tokenName = symbol.split('/')[0]

  const currencyBalance = useCurrencyBalance(currencyName)
  const [create, { isLoading }] = useCreateOTCOrder()
  const submitForm = async (values: PlaceOrderArgs) => {
    const args = orderPayloadtoOTCAdapt({ values, account })
    return await create(args)
  }
  const isFetching = false
  const createOrderStatus = ''
  return (
    <Grid
      item
      container
      alignItems={'flex-start'}
      justifyContent='space-between'
      columnSpacing={2}
      ml={0}
    >
      <Grid item className={classes.colorGrid} minHeight={325} xs={12} md={8}>
        <TradingOrders />
      </Grid>

      <Grid item container xs={12} md={4}>
        <PlaceOrderForm
          createOrderStatus={createOrderStatus}
          isFetching={isFetching}
          currencyLabel={currencyName}
          tokenLabel={tokenName}
          isDisabled={!isWhitelisted || isLoading}
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
