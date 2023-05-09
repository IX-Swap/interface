import React from 'react'
import { Grid, Button } from '@mui/material'
import { withStyles } from '@mui/styles'

export interface IntermediaryInvestorInfoActionProps {
  close?: () => void
}
export const IntermediaryInvestorInfoAction: React.FC<
  IntermediaryInvestorInfoActionProps
> = ({ close }) => {
  const StyledButton = withStyles(theme => {
    return {
      root: {
        textTransform: 'none',
        '&:first-child': {
          margin: theme.spacing(0, 'auto')
        },
        [theme.breakpoints.down('md')]: {
          width: '100%'
        }
      }
    }
  })(Button)

  return (
    <Grid
      container
      sx={{ justifyContent: { xs: 'center', md: 'end' } }}
      spacing={2}
    >
      <Grid item xs={6} md={2}>
        <StyledButton
          color='primary'
          onClick={close}
          variant='contained'
          fullWidth
        >
          OK
        </StyledButton>
      </Grid>
    </Grid>
  )
}
