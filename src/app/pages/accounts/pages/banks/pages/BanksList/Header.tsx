import React from 'react'
import { Grid, Button } from '@mui/material'
import { BanksRoute } from '../../router/config'
import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

export const Header = () => {
  return (
    <Grid item container xs={12} justifyContent='flex-end'>
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
    </Grid>
  )
}
