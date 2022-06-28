import { Launch } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { useStyles } from 'app/pages/invest/components/Trading/PlaceOrderSuffix.styles'
import { ReactComponent as InfoIcon } from 'assets/icons/info-light.svg'
import { AppRouterLink } from 'components/AppRouterLink'
import React, { useMemo } from 'react'
import { useMetamaskConnectionManager } from 'app/pages/invest/hooks//useMetamaskConnectionManager'
import { AccountState } from 'app/pages/invest/hooks/useMetamaskWalletState'
import { useFormContext } from 'react-hook-form'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

interface PlaceOrderSuffixProps {
  currencyBalance: number
  tokenBalance: number
  tokenName: string
  tab?: number
}
export const PlaceOrderSuffix = ({
  currencyBalance,
  tokenBalance,
  tokenName,
  tab = 0
}: PlaceOrderSuffixProps) => {
  const classes = useStyles()
  const {
    connectCallback,
    switchChain,
    accountState,
    targetChainName,
    isWhitelisted
  } = useMetamaskConnectionManager()
  const { watch } = useFormContext()
  const { isTablet } = useAppBreakpoints()
  const price = watch('price')
  const amount = watch('amount')

  const { found } = isWhitelisted

  const wrongChainMessage = useMemo(() => {
    if (isTablet) {
      return (
        <Typography variant='subtitle2'>
          Please switch the Network to {targetChainName} on your wallet to place
          order.
        </Typography>
      )
    }
    return (
      <Typography variant='subtitle2'>
        Please connect to
        <Box
          onClick={() => switchChain()}
          className={classes.connectLink}
          data-testId='place-order-suffix-switch-chain'
        >
          {targetChainName} network
        </Box>
        to place your order
      </Typography>
    )
  }, [isTablet, targetChainName, switchChain, classes.connectLink])

  const noCurrencyBalance =
    (currencyBalance <= 0 ||
      currencyBalance < Number(amount) * Number(price)) &&
    tab === 0
  const noTokenBalance =
    (tokenBalance <= 0 || tokenBalance < Number(amount)) && tab === 1

  const body = useMemo(() => {
    if (accountState === AccountState.NOT_CONNECTED) {
      return (
        <Typography variant='subtitle2'>
          Please
          <Box
            onClick={connectCallback}
            className={classes.connectLink}
            data-testid='place-order-suffix-connect'
          >
            connect
          </Box>
          your Metamask wallet to place any orders
        </Typography>
      )
    }
    if (!found) {
      return (
        <>
          <Typography variant='subtitle2'>
            Please
            <AppRouterLink
              target='_blank'
              to={WithdrawalAddressesRoute.create}
              underline='always'
              color='primary'
              className={classes.connectLink}
            >
              add
            </AppRouterLink>
            your wallet address to place any orders
          </Typography>
          <AppRouterLink target='_blank' to={WithdrawalAddressesRoute.create}>
            <Launch color='primary' style={{ width: 23, height: 23 }} />
          </AppRouterLink>
        </>
      )
    }
    if (accountState === AccountState.DIFFERENT_CHAIN) {
      return wrongChainMessage
    }
    if (noCurrencyBalance) {
      return (
        <Typography variant='subtitle2'>
          Insufficient balance, please top-up your account
          <AppRouterLink
            target='_blank'
            to={AccountsRoute.depositCash}
            underline='always'
            color='primary'
            className={classes.connectLink}
          >
            here
          </AppRouterLink>
        </Typography>
      )
    }
    if (noTokenBalance) {
      return (
        <Typography
          variant='subtitle2'
          data-testId='place-order-suffix-no-tokens'
        >
          Sell order cannot be placed if there is not enough {tokenName}
        </Typography>
      )
    }
    return null
  }, [
    accountState,
    classes,
    tokenName,
    noCurrencyBalance,
    noTokenBalance,
    found,
    connectCallback,
    wrongChainMessage
  ])

  if (
    found &&
    accountState === AccountState.SAME_CHAIN &&
    !noCurrencyBalance &&
    !noTokenBalance
  ) {
    return null
  }

  return (
    <Box className={classes.wrapper}>
      <InfoIcon className={classes.icon} />
      {body}
    </Box>
  )
}
