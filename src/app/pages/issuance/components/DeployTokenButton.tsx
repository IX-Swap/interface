import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { DeploymentInfo } from 'types/dso'
import { formatDateAndTime } from 'helpers/dates'

export interface DeployTokenButtonProps {
  isInitializing: boolean
  isDeploying: boolean
  onClick: () => any
  deploymentInfo?: DeploymentInfo
}

export const DeployTokenButton = (props: DeployTokenButtonProps) => {
  const { isDeploying, isInitializing, deploymentInfo, onClick } = props
  const isDeployed = deploymentInfo !== undefined

  return (
    <Grid container direction='column' alignItems='flex-end' spacing={1}>
      <Grid item>
        <Button
          variant='contained'
          color='primary'
          disabled={isDeploying || isInitializing || isDeployed}
          onClick={onClick}
        >
          Deploy
        </Button>
      </Grid>
      <Grid item>
        {!isDeployed && isInitializing && (
          <Typography>Getting info...</Typography>
        )}
        {!isDeployed && isDeploying && (
          <Typography>Token is being deployed...</Typography>
        )}
        {isDeployed && (
          <Typography>
            Successfully deployed at{' '}
            {formatDateAndTime(deploymentInfo?.updatedAt ?? '')}
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}
