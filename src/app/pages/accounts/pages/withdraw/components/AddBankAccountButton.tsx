import { Button } from '@mui/material'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React from 'react'

export const AddBankAccountButton = ({
  variant
}: {
  variant: 'outlined' | 'contained'
}) => {
  return (
    <Button
      data-testid={'button'}
      component={AppRouterLinkComponent}
      variant={variant}
      color='primary'
      disableElevation
      to={BanksRoute.create}
    >
      Add Bank Account
    </Button>
  )
}
