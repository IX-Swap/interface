import React from 'react'
import { DSOList as DSOListComponent } from 'app/components/DSO/components/DSOList'
import { IssuanceRoute, useIssuanceRouter } from 'app/pages/issuance/router'
import { Button, Grid } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

export const DSOList = () => {
  const { paths } = useIssuanceRouter()

  return (
    <Grid container direction='column'>
      <Grid item container justify='flex-end'>
        <Button
          component={AppRouterLinkComponent}
          size='large'
          color='primary'
          variant='contained'
          to={paths.create}
        >
          Add
        </Button>
      </Grid>
      <Grid item>
        <DSOListComponent all={false} viewURL={IssuanceRoute.view} />
      </Grid>
    </Grid>
  )
}
