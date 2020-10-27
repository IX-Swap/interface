import React, { forwardRef, ReactNode, ReactText } from 'react'
import { Paper, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

export interface NotificationProps {
  key: ReactText
  message: ReactNode
}

export const Notification = forwardRef((props: NotificationProps, ref: any) => {
  return (
    <Paper id={`${props.key}`} ref={ref}>
      <Alert severity='info'>
        <Typography>{props.message}</Typography>
      </Alert>
    </Paper>
  )
})
