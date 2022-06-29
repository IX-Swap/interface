import { Grid } from '@mui/material'
import { PlaceOrderForm } from 'app/pages/invest/components/PlaceOrderForm/PlaceOrderForm'
import { PlaceOrderFormDialog } from 'app/pages/invest/components/PlaceOrderForm/PlaceOrderFormDialog'
import { useCurrencyBalance } from 'app/pages/invest/hooks/useCurrencyBalance'
import { PlaceOrderArgs } from 'app/pages/invest/types/form'
import { TradingOrders } from 'app/pages/invest/components/Trading/Orders/TradingOrders'
import { PlaceOrderSuffix } from 'app/pages/invest/components/Trading/PlaceOrderSuffix'
import { useStyles } from 'app/pages/invest/components/Trading/TradingContainer.styles'
import { useCreateOTCOrder } from 'app/pages/invest/hooks/useCreateOTCOrder'
import { useFeaturedPairNames } from 'app/pages/invest/hooks/useFeaturedPairNames'
import { useMetamaskConnectionManager } from 'app/pages/invest/hooks/useMetamaskConnectionManager'
import { AccountState } from 'app/pages/invest/hooks/useMetamaskWalletState'
import { usePairTokenAddressNetwork } from 'app/pages/invest/hooks/usePairTokenAddressNetwork'
import { useCryptoBalance } from 'hooks/blockchain/useCryptoBalance'
import { useActiveWeb3React } from 'hooks/blockchain/web3'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'

export const TradingBody = () => {
  const classes = useStyles()
  const { address } = usePairTokenAddressNetwork()
  const balance = useCryptoBalance(address)
  const { account } = useActiveWeb3React()
  const { isMiniLaptop } = useAppBreakpoints()
  const {
    accountState,
    isWhitelisted: { found }
  } = useMetamaskConnectionManager()
  const { currencyName, tokenName } = useFeaturedPairNames()
  const currencyBalance = useCurrencyBalance(currencyName)
  const [create, { isLoading }] = useCreateOTCOrder()
  const submitForm = async (values: PlaceOrderArgs) => {
    return await create({ args: values, account })
  }
  const disabledCreate =
    !found || isLoading || accountState === AccountState.DIFFERENT_CHAIN
  const renderSuffix = ({ tab }: { tab: number }) => (
    <PlaceOrderSuffix
      tab={tab}
      currencyBalance={currencyBalance}
      tokenBalance={balance}
      tokenName={tokenName}
    />
  )
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
      <Grid item className={classes.colorGrid} minHeight={325} xs={12} lg={8}>
        <TradingOrders />
      </Grid>

      {!isMiniLaptop && (
        <Grid item container xs={12} lg={4}>
          <PlaceOrderForm
            createOrderStatus={createOrderStatus}
            isFetching={isFetching}
            currencyLabel={currencyName}
            tokenLabel={tokenName}
            isDisabled={disabledCreate}
            currencyBalance={currencyBalance}
            suffix={renderSuffix}
            tokenBalance={balance}
            onSubmit={submitForm}
          />
        </Grid>
      )}

      {isMiniLaptop && (
        <PlaceOrderFormDialog
          symbol={currencyName}
          createOrderStatus={createOrderStatus}
          isFetching={isFetching}
          currencyName={currencyName}
          tokenName={tokenName}
          currencyBalance={currencyBalance}
          tokenBalance={{ data: { amount: balance } }}
          suffix={renderSuffix}
          submitForm={submitForm}
        />
      )}
    </Grid>
  )
}
