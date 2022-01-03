import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

export interface OptOutInfoActionProps {
  close?: () => void
}
export const OptOutInfoAction: React.FC<OptOutInfoActionProps> = ({
  close
}) => {
  const StyledButton = withStyles({
    root: {
      textTransform: 'none',
      '&:first-child': {
        marginRight: 24
      }
    }
  })(Button)

  return (
    <>
      <Grid container justifyContent='center'>
        <Grid item>
          <StyledButton color='primary' onClick={close} variant='outlined'>
            Cancel
          </StyledButton>
          <StyledButton color='primary' onClick={close} variant='contained'>
            Opt Out
          </StyledButton>
        </Grid>
      </Grid>
    </>
  )
}
