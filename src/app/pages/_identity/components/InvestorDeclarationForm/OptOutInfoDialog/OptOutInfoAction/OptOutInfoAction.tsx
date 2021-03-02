import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

export interface OptOutInfoActionProps {
  close?: () => void
  onOptOut: () => void
}
export const OptOutInfoAction: React.FC<OptOutInfoActionProps> = ({
  close,
  onOptOut
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
      <Grid container justify='center'>
        <Grid item>
          <StyledButton color='primary' onClick={close} variant='outlined'>
            Cancel
          </StyledButton>
          <StyledButton color='primary' onClick={onOptOut} variant='contained'>
            Opt Out
          </StyledButton>
        </Grid>
      </Grid>
    </>
  )
}
