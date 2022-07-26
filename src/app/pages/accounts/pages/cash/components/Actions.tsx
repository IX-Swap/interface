import { Box, Button } from '@mui/material'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React from 'react'
import { ConvertedAssetBalance } from 'types/balance'

export interface ActionsProps {
  item: ConvertedAssetBalance
}

export const Actions = ({ item }: ActionsProps) => {
  const styles = { height: 33, marginRight: 8 }
  const account = item.accountNumber
  const depositLink = `${AccountsRoute.deposit}?account=${account}`
  const withdrawLink = `${AccountsRoute.withdraw}?account=${account}`
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
      <Button
        style={styles}
        variant={'text'}
        component={AppRouterLinkComponent}
        // to={AccountsRoute.deposit}
        to={depositLink}
      >
        Deposit
      </Button>
      <Button
        style={styles}
        variant={'text'}
        component={AppRouterLinkComponent}
        // to={AccountsRoute.withdraw}
        to={withdrawLink}
      >
        Withdraw
      </Button>
    </Box>
  )
}
