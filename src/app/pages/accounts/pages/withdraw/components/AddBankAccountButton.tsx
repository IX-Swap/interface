import { Button, ButtonProps } from '@mui/material'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'

interface AddBankAccountButtonProps extends ButtonProps {
  variant: 'outlined' | 'contained'
  title?: string
}

export const AddBankAccountButton = ({
  variant,
  title = 'Add Bank Account',
  ...rest
}: AddBankAccountButtonProps) => {
  const { isTablet } = useAppBreakpoints()
  return (
    <Button
      data-testid={'button'}
      component={AppRouterLinkComponent}
      variant={variant}
      color='primary'
      disableElevation
      fullWidth={isTablet}
      to={BanksRoute.create}
      size={isTablet ? 'large' : 'medium'}
      {...rest}
    >
      Add Bank Account
    </Button>
  )
}
