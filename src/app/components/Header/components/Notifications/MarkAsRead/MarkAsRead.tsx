import React from 'react'
import { Button, Tooltip } from '@mui/material'
import { useStyles } from './MarkAsRead.styles'
import { Notification } from 'types/notification'

export interface MarkAsReadProps {
  data: Notification
}

export const MarkAsRead = (props: MarkAsReadProps) => {
  const { data } = props
  const classes = useStyles({ isUnread: !data.read })

  return (
    <Tooltip title='Mark as read'>
      <Button className={classes.container} component='div' disabled />
    </Tooltip>
  )
}
