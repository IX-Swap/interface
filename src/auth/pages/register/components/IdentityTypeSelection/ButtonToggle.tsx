import React, { MouseEventHandler } from 'react'
import { Button, Typography } from '@mui/material'

interface ButtonToggleProps {
  onClick: MouseEventHandler
  isIndividual?: boolean
}

export const ButtonToggle = ({
  onClick,
  isIndividual = true
}: ButtonToggleProps) => (
  <Typography align='center' sx={{ color: 'rgba(255, 255, 255, .5)' }}>
    Creating {isIndividual ? 'a ' : 'an '}
    <Button
      variant='text'
      onClick={onClick}
      disableRipple
      sx={{
        textTransform: 'capitalize',
        color: 'rgba(255,255,255,1)',
        padding: 0,
        ':hover': {
          backgroundColor: 'transparent'
        }
      }}
    >
      {isIndividual ? 'Corporate' : 'Individual'} Account
    </Button>{' '}
    ?
  </Typography>
)
