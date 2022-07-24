import { Button } from '@mui/material'
import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React from 'react'
import { BanksRoute } from '../../router/config'

export const Header = () => {
  return (
    <TwoFADialogWrapper>
      <Button
        data-testid={'button'}
        component={AppRouterLinkComponent}
        variant='contained'
        color='primary'
        disableElevation
        to={BanksRoute.create}
      >
        Add Bank Account
      </Button>
    </TwoFADialogWrapper>
  )
}
