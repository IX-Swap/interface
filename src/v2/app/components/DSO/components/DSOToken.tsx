import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { useIssuanceRouter } from 'v2/app/pages/issuance/router'
import { useDSOById } from 'v2/app/pages/invest/hooks/useDSOById'

export const DSOToken = () => {
  const { paths, params } = useIssuanceRouter()
  const { data, isLoading } = useDSOById(params.dsoId, params.issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  const isDeployed = data.deploymentInfo !== undefined
  const isDisabled = data.status === 'Submitted'

  return (
    <Grid container alignItems='center' justify='space-between'>
      <Grid item>{data.deploymentInfo?.token ?? '-'}</Grid>
      <Grid item>
        <AppRouterLink
          to={paths.deployToken}
          params={params}
          disabled={isDisabled}
        >
          <Button
            disabled={isDisabled}
            color='primary'
            variant={isDeployed ? 'outlined' : 'contained'}
          >
            {isDeployed ? 'View Deployment Info' : 'Deploy Token'}
          </Button>
        </AppRouterLink>
      </Grid>
    </Grid>
  )
}
