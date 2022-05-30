import { Launch } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { useStyles } from 'app/pages/invest/components/Trading/PlaceOrderSuffix.styles'
import { ReactComponent as InfoIcon } from 'assets/icons/info-light.svg'
import { AppRouterLink } from 'components/AppRouterLink'
import { isEmptyString } from 'helpers/strings'
import React from 'react'
import { useMetamaskConnectionManager } from '../../hooks/useMetamaskConnectionManager'
import { AccountState } from '../../hooks/useMetamaskWalletState'

interface PlaceOrderSuffixProps {
  isWhiteListed: boolean
  account?: string | null
}
export const PlaceOrderSuffix = ({
  isWhiteListed,
  account
}: PlaceOrderSuffixProps) => {
  const classes = useStyles()
  const { connectCallback, switchChain, accountState, targetChainName } =
    useMetamaskConnectionManager()
  if (isWhiteListed && accountState === AccountState.SAME_CHAIN) {
    return null
  }
  return (
    <Box className={classes.wrapper}>
      <InfoIcon className={classes.icon} />
      {accountState === AccountState.NOT_CONNECTED && (
        <Typography variant='subtitle2'>
          Please
          <Box onClick={connectCallback} className={classes.connectLink}>
            connect
          </Box>
          your Metamask wallet to place any orders
        </Typography>
      )}
      {!isEmptyString(account) && !isWhiteListed && (
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
      )}
      {isWhiteListed && accountState === AccountState.DIFFERENT_CHAIN && (
        <>
          <Typography variant='subtitle2'>
            Please connect to
            <Box onClick={() => switchChain()} className={classes.connectLink}>
              {targetChainName} network
            </Box>
            to place your order
          </Typography>
        </>
      )}
    </Box>
  )
}
