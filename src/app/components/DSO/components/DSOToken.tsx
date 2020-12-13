import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { AppRouterLinkComponent, AppRouterLink } from 'components/AppRouterLink'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useAuth } from 'hooks/auth/useAuth'
import { getBlockchainUrl } from '../utils'

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

  const token = data.deploymentInfo?.token
  const tokenUrl = getBlockchainUrl(token, data.network, 'token')

  return (
    <Grid container alignItems='center' justify='space-between'>
      <Grid item>
        {token !== undefined ? (
          <AppRouterLink
            target='_blank'
            to={tokenUrl}
            underline='always'
            color='primary'
          >
            {token}
          </AppRouterLink>
        ) : (
          '-'
        )}
      </Grid>
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
