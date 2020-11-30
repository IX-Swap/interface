import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { DSO } from 'app/pages/issuance/components/DSO'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { VSpacer } from 'components/VSpacer'

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
