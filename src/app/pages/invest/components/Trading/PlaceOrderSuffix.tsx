import { Launch } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { useStyles } from 'app/pages/invest/components/Trading/PlaceOrderSuffix.styles'
import { ReactComponent as InfoIcon } from 'assets/icons/info-light.svg'
import { AppRouterLink } from 'components/AppRouterLink'
import { WalletModalContext } from 'components/WalletModal/WalletModalContextWrapper'
import { isEmptyString } from 'helpers/strings'
import React, { useContext } from 'react'

interface PlaceOrderSuffixProps {
  isWhiteListed: boolean
  account?: string | null
}
export const PlaceOrderSuffix = ({
  isWhiteListed,
  account
}: PlaceOrderSuffixProps) => {
  const classes = useStyles()
  const context = useContext(WalletModalContext)
  if (!isEmptyString(account) && isWhiteListed) {
    return null
  }
  return (
    <Box className={classes.wrapper}>
      <InfoIcon className={classes.icon} />
      {isEmptyString(account) && (
        <Typography variant='subtitle2'>
          Please
          <Box onClick={context?.toggleModal} className={classes.connectLink}>
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
    </Box>
  )
}
