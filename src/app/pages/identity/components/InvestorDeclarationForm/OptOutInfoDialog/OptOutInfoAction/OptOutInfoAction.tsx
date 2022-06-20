import React from 'react'
import { Button, Grid } from '@mui/material'
import { withStyles } from '@mui/styles'

export interface OptOutInfoActionProps {
  close?: () => void
}
export const OptOutInfoAction: React.FC<OptOutInfoActionProps> = ({
  close
}) => {
  const StyledButton = withStyles({
    root: {
      textTransform: 'none',
      whiteSpace: 'nowrap'
    }
  })(Button)

  return (
    <>
      <Grid container justifyContent='center' spacing={2}>
        <Grid item xs={6}>
          <StyledButton
            fullWidth
            color='primary'
            onClick={close}
            variant='outlined'
          >
            Cancel
          </StyledButton>
        </Grid>
        <Grid item xs={6}>
          <StyledButton
            fullWidth
            color='primary'
            onClick={close}
            variant='contained'
          >
            Opt Out
          </StyledButton>
        </Grid>
      </Grid>
    </>
  )
}
