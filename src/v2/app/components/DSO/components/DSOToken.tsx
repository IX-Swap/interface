import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import { useIssuanceRouter } from 'v2/app/pages/issuance/router'
import { useDSOById } from 'v2/app/pages/invest/hooks/useDSOById'
import { useAuth } from 'v2/hooks/auth/useAuth'

export const DSOToken = () => {
  const { paths, params } = useIssuanceRouter()
  const { data, isLoading } = useDSOById(params.dsoId, params.issuerId)
  const { user } = useAuth()

  if (isLoading || data === undefined) {
    return null
  }

  const isDeployed = data.deploymentInfo !== undefined
  const isDisabled = data.status !== 'Approved'
  const showButton = data.user === user?._id

  return (
    <Grid container alignItems='center' justify='space-between'>
      <Grid item>{data.deploymentInfo?.token ?? '-'}</Grid>
      {showButton && (
        <Grid item>
          <Button
            component={AppRouterLinkComponent}
            to={paths.deployToken}
            params={params}
            disabled={isDisabled}
            color='primary'
            variant={isDeployed ? 'outlined' : 'contained'}
          >
            {isDeployed ? 'View Deployment Info' : 'Deploy Token'}
          </Button>
        </Grid>
      )}
    </Grid>
  )
}
