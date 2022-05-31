import { Grid } from '@mui/material'
import { useWithdrawalAddressAdded } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddressAdded'
import { PlaceOrderForm } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm'
import { useCurrencyBalance } from 'app/pages/exchange/hooks/useCurrencyBalance'
import { PlaceOrderArgs } from 'app/pages/exchange/types/form'
import { TradingOrders } from 'app/pages/invest/components/Trading/Orders/TradingOrders'
import { PlaceOrderSuffix } from 'app/pages/invest/components/Trading/PlaceOrderSuffix'
import { useStyles } from 'app/pages/invest/components/Trading/TradingContainer.styles'
import {
  orderPayloadtoOTCAdapt,
  useCreateOTCOrder
} from 'app/pages/invest/hooks/useCreateOTCOrder'
import { useFeaturedPair } from 'app/pages/invest/hooks/useFeaturedPair'
import { usePairTokenAddressNetwork } from 'app/pages/invest/hooks/usePairTokenAddressNetwork'
import { useCryptoBalance } from 'hooks/blockchain/useCryptoBalance'
import { useActiveWeb3React } from 'hooks/blockchain/web3'
import React from 'react'

export const TradingBody = () => {
  const classes = useStyles()
  const { data: pair } = useFeaturedPair()
  const symbol = pair?.name ?? ''
  const { address } = usePairTokenAddressNetwork()
  const balance = useCryptoBalance(address)
  const { account } = useActiveWeb3React()
  const { found } = useWithdrawalAddressAdded(account)
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
          isDisabled={!found || isLoading}
          currencyBalance={currencyBalance}
          suffix={({ tab }: { tab: number }) => (
            <PlaceOrderSuffix
              tab={tab}
              currencyBalance={currencyBalance}
              tokenBalance={balance}
              tokenName={tokenName}
            />
          )}
          tokenBalance={balance}
          onSubmit={submitForm}
        />
      </Grid>
    </Grid>
  )
}
