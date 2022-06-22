import React from 'react'
import { IconButton, InputAdornment, IconButtonProps } from '@mui/material'
import { Icon } from 'ui/Icons/Icon'

export interface FocusButtonProps extends IconButtonProps {}

export const FocusButton = (props: FocusButtonProps) => {
  return (
    <InputAdornment position='end' sx={{ ml: 0 }}>
      <IconButton disableTouchRipple disableRipple {...props}>
        <Icon name='edit' />
      </IconButton>
    </InputAdornment>
  )
}
