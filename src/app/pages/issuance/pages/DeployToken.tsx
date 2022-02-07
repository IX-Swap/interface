import React from 'react'
import { Grid } from '@mui/material'
import { useDeployToken } from 'app/pages/issuance/hooks/useDeployToken'
import { useParams } from 'react-router-dom'
import { DeployTokenMessagesList } from 'app/pages/issuance/components/DeployTokenMessagesList'
import { DSOTitle } from 'app/components/DSO/components/DSOTitle'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { DeployTokenButton } from 'app/pages/issuance/components/DeployTokenButton'

export const DeployToken = () => {
  const params = useParams<{ dsoId: string; issuerId: string }>()
  const { data, isLoading } = useDSOById(params.dsoId, params.issuerId)
  const { deploy, isInitializing, isDeploying, isDeployed } = useDeployToken(
    params.dsoId
  )

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
          justifyContent='flex-end'
          alignItems='flex-start'
          xs={12}
          sm={3}
        >
          <DeployTokenButton
            isInitializing={isInitializing}
            isDeployed={isDeployed}
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
