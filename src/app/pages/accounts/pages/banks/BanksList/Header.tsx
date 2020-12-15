import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useBanksRouter } from '../router'

export const Header: React.FC = () => {
  const { paths: banksPaths } = useBanksRouter()

  return (
    <Grid item container xs={12} justify='flex-end'>
      <Button
        component={AppRouterLinkComponent}
        variant='contained'
        color='primary'
        disableElevation
        to={banksPaths.create}
      >
        Add Bank Account
      </Button>
    </Grid>
  )
}
