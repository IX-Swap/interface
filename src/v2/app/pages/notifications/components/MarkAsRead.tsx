import React from 'react'
import { Button, Tooltip } from '@material-ui/core'
import { useStyles } from 'v2/app/pages/notifications/components/MarkAsRead.styles'
import { Notification } from 'v2/types/notification'
import { useMarkAsRead } from '../hooks/useMarkAsRead'

export interface MarkAsReadProps {
  data: Notification
}

export const MarkAsRead = (props: MarkAsReadProps) => {
  const { data } = props
  const classes = useStyles()
  const { mutation, isLoading } = useMarkAsRead(data)
  const handleClick = () => mutation()

  return (
    <Tooltip title='Mark as read'>
      <Button
        className={classes.container}
        component='div'
        onClick={handleClick}
        disabled={data.read || isLoading}
      />
    </Tooltip>
  )
}
