import React from 'react'
import { ButtonProps, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

export const NotificationToastClose = (props: ButtonProps) => {
  return (
    <IconButton
      size='small'
      onClick={props.onClick}
      style={{ cursor: 'pointer' }}
    >
      <Close />
    </IconButton>
  )
}
