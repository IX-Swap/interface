import React from 'react'
import { ButtonProps, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

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
