import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { DSO } from 'v2/app/pages/issuance/components/DSO'
import { useIssuanceRouter } from 'v2/app/pages/issuance/router'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import { VSpacer } from 'v2/components/VSpacer'

export const ViewDSO = () => {
  const {
    params: { dsoId }
  } = useIssuanceRouter()
  const { paths } = useIssuanceRouter()

  return (
    <Grid container direction='column'>
      <Grid item container justify='flex-end'>
        <Button
          component={AppRouterLinkComponent}
          color='primary'
          variant='contained'
          to={paths.edit}
          params={{ dsoId }}
        >
          Edit
        </Button>
      </Grid>
      <Grid item>
        <VSpacer size='small' />
      </Grid>
      <Grid item>
        <DSO dsoId={dsoId} showAuthorizations />
      </Grid>
    </Grid>
  )
}
