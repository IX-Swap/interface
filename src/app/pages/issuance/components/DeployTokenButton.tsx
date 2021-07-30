import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { DeploymentInfo } from 'types/dso'
import { formatDateAndTime } from 'helpers/dates'

export interface DeployTokenButtonProps {
  isInitializing: boolean
  isDeploying: boolean
  isDeployed: boolean
  onClick: () => any
  deploymentInfo?: DeploymentInfo
}

export const DeployTokenButton = (props: DeployTokenButtonProps) => {
  const {
    isDeploying,
    isDeployed,
    isInitializing,
    deploymentInfo,
    onClick
  } = props
  const deployed = isDeployed || deploymentInfo !== undefined

  return (
    <Grid container direction='column' alignItems='flex-end' spacing={1}>
      <Grid item>
        <Button
          variant='contained'
          color='primary'
          disabled={isDeploying || isInitializing || deployed}
          onClick={onClick}
        >
          Deploy
        </Button>
      </Grid>
      <Grid item>
        {!deployed && isInitializing && (
          <Typography>Getting info...</Typography>
        )}
        {!deployed && isDeploying && (
          <Typography>Token is being deployed...</Typography>
        )}
        {deployed && (
          <Typography>
            Successfully deployed at{' '}
            {formatDateAndTime(deploymentInfo?.updatedAt ?? '')}
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}
