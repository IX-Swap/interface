import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { BanksRoute } from '../../router/config'

export const Header = () => {
  return (
    <Grid item container xs={12} justify='flex-end'>
      <Button
        component={AppRouterLinkComponent}
        variant='contained'
        color='primary'
        disableElevation
        to={BanksRoute.create}
      >
        Add Bank Account
      </Button>
    </Grid>
  )
}
