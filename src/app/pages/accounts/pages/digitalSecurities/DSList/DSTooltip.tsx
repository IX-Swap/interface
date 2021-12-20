import { Box, Typography } from '@material-ui/core'
import { WithdrawalAddressTooltip } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressTooltip'
import React from 'react'

export const DSTooltip = () => {
  return (
    <Box p={1}>
      <WithdrawalAddressTooltip
        placement='right-end'
        title={
          <Typography>
            Custody wallets are recommended for holding your assets, as this
            would enable full trading of your assets on the platform. Self
            custody wallets are an alternative option for holding tokens in your
            own wallet of choice and hence available tokens cannot be displayed.
          </Typography>
        }
      />
    </Box>
  )
}
