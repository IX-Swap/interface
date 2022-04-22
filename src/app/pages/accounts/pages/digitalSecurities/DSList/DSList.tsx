import React from 'react'
import { Button, Grid } from '@mui/material'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'
import { DSTabs } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSTabs'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

export const DSList: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader title='Digital Securities' />
      </Grid>
      <Grid item xs={12} container spacing={1} justifyContent='flex-end'>
        <Grid item>
          <Button
            component={AppRouterLinkComponent}
            variant='outlined'
            color='primary'
            to={DSRoute.deposit}
          >
            Deposit
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={AppRouterLinkComponent}
            variant='outlined'
            color='primary'
            to={DSRoute.withdraw}
          >
            Withdraw
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <DSTabs />
      </Grid>
    </Grid>
  )
}
