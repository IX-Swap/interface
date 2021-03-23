import React from 'react'
import { MyDSOsTable } from 'app/pages/issuance/components/MyDSOsTable'
import { Button, Grid } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const DSOList = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='My DSOs' />
      </Grid>
      <Grid item container justify='flex-end'>
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
