import React from 'react'
import { DSOList as DSOListComponent } from 'v2/app/components/DSO/components/DSOList'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { IssuanceRoute, useIssuanceRouter } from 'v2/app/pages/issuance/router'
import { Button, Grid } from '@material-ui/core'
import { AppRouterLink } from 'v2/components/AppRouterLink'

export const DSOList = () => {
  const { user } = useAuth()
  const { paths } = useIssuanceRouter()

  return (
    <Grid container direction='column'>
      <Grid item container justify='flex-end'>
        <AppRouterLink to={paths.create}>
          <Button size='large' color='primary' variant='contained'>
            Add
          </Button>
        </AppRouterLink>
      </Grid>
      <Grid item>
        <DSOListComponent
          filter={{}}
          user={user ?? null}
          viewURL={IssuanceRoute.view}
        />
      </Grid>
    </Grid>
  )
}
