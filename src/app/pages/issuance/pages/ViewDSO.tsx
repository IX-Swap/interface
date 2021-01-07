import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { DSO } from 'app/pages/issuance/components/DSO'
import { useParams } from 'react-router-dom'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { VSpacer } from 'components/VSpacer'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

export const ViewDSO = () => {
  const params = useParams<{ dsoId: string }>()

  return (
    <Grid container direction='column'>
      <Grid item container justify='flex-end'>
        <Button
          component={AppRouterLinkComponent}
          color='primary'
          variant='contained'
          to={IssuanceRoute.edit}
          params={params}
        >
          Edit
        </Button>
      </Grid>
      <Grid item>
        <VSpacer size='small' />
      </Grid>
      <Grid item>
        <DSO dsoId={params.dsoId} showAuthorizations />
      </Grid>
    </Grid>
  )
}
