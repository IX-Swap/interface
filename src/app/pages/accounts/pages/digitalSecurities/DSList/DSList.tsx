import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { DSTabs } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSTabs'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router/config'

export const DSList: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader title='Digital Securities' />
      </Grid>
      <Grid item xs={12} container spacing={1} justifyContent='flex-end'>
        <Grid item>
          <Button variant='outlined' color='primary' href={DSRoute.deposit}>
            deposit
          </Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' color='primary' href={DSRoute.withdraw}>
            withdraw
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <DSTabs />
      </Grid>
    </Grid>
  )
}
