import React from 'react'
import { MyDSOsTable } from 'app/pages/issuance/components/MyDSOsTable'
import { Button, Grid } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'

export const DSOList = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='My DSOs' />
      </Grid>
      <Grid item container justifyContent='flex-end'>
        <Button
          component={AppRouterLinkComponent}
          size='large'
          color='primary'
          variant='contained'
          to={IssuanceRoute.create}
        >
          Add
        </Button>
      </Grid>
      <Grid item>
        <MyDSOsTable />
      </Grid>
    </Grid>
  )
}
