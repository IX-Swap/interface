import React from 'react'
import { MyDSOsTable } from 'app/pages/issuance/components/MyDSOsTable'
import { Button, Grid } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

export const DSOList = () => {
  return (
    <Grid container direction='column'>
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
