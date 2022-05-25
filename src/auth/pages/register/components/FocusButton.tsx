import React from 'react'
import { IconButton, ButtonProps, InputAdornment } from '@mui/material'
import { Icon } from 'ui/Icons/Icon'

export interface FocusButtonProps extends ButtonProps {}

export const FocusButton = (props: FocusButtonProps) => {
  return (
    <InputAdornment position='end' sx={{ ml: 0 }}>
      <IconButton disableTouchRipple disableRipple {...props}>
        <Icon name='edit' />
      </IconButton>
    </InputAdornment>
  )
}
