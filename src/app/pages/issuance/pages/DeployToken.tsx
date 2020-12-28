import React from 'react'
import { Grid } from '@material-ui/core'
import { useDeployToken } from 'app/pages/issuance/hooks/useDeployToken'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { DeployTokenMessagesList } from 'app/pages/issuance/components/DeployTokenMessagesList'
import { DSOTitle } from 'app/components/DSO/components/DSOTitle'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { DeployTokenButton } from 'app/pages/issuance/components/DeployTokenButton'

export const DeployToken = () => {
  const { params } = useIssuanceRouter()
  const { data, isLoading } = useDSOById(params.dsoId, params.issuerId)
  const { deploy, isInitializing, isDeploying } = useDeployToken(params.dsoId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container direction='column' spacing={4}>
      <Grid item container>
        <Grid item xs={12} sm={9}>
          <DSOTitle dso={data} />
        </Grid>
        <Grid
          item
          container
          justify='flex-end'
          alignItems='flex-start'
          xs={12}
          sm={3}
        >
          <DeployTokenButton
            isInitializing={isInitializing}
            isDeploying={isDeploying}
            deploymentInfo={data.deploymentInfo}
            onClick={deploy}
          />
        </Grid>
      </Grid>
      <Grid item>
        <DeployTokenMessagesList isInitializing={isInitializing} />
      </Grid>
    </Grid>
  )
}
