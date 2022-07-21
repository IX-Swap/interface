import { Button, ButtonProps } from '@mui/material'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React from 'react'

interface ManageBankAccountsButtonProps extends ButtonProps {
  variant: 'outlined' | 'contained'
  title?: string
}

export const ManageBankAccountsButton = ({
  variant,
  title = 'Manage bank accounts',
  ...rest
}: ManageBankAccountsButtonProps) => {
  return (
    <Button
      data-testid={'button'}
      component={AppRouterLinkComponent}
      variant={variant}
      color='primary'
      disableElevation
      to={BanksRoute.list}
      {...rest}
    >
      {title}
    </Button>
  )
}
