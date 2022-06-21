import React from 'react'
import { Button } from '@mui/material'
import { withStyles } from '@mui/styles'

export interface SafeguardInfoActionProps {
  close?: () => void
}
export const SafeguardInfoAction: React.FC<SafeguardInfoActionProps> = ({
  close
}) => {
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
    <StyledButton color='primary' onClick={close} variant='contained'>
      Ok
    </StyledButton>
  )
}
