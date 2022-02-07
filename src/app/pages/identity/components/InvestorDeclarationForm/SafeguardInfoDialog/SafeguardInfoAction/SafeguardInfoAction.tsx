import React from 'react'
import { Button, Grid } from '@mui/material'
import { withStyles } from '@mui/styles'

export interface SafeguardInfoActionProps {
  close?: () => void
}
export const SafeguardInfoAction: React.FC<SafeguardInfoActionProps> = ({
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
          <StyledButton color='primary' onClick={close} variant='contained'>
            Ok
          </StyledButton>
        </Grid>
      </Grid>
    </>
  )
}
