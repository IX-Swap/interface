import React from 'react'
import { Button, Tooltip } from '@mui/material'
import { useStyles } from 'app/pages/notifications/components/MarkAsRead.styles'
import { Notification } from 'types/notification'
import { useMarkAsRead } from 'app/pages/notifications/hooks/useMarkAsRead'

export interface MarkAsReadProps {
  data: Notification
}

export const MarkAsRead = (props: MarkAsReadProps) => {
  const { data } = props
  const { mutation, isLoading } = useMarkAsRead(data)
  const isButtonDisabled = data.read || isLoading
  const classes = useStyles({ isUnread: isButtonDisabled })
  const handleClick = async () => await mutation()

  return (
    <Tooltip title='Mark as read'>
      <Button
        className={classes.container}
        component='div'
        onClick={handleClick}
        disabled={isButtonDisabled}
      />
    </Tooltip>
  )
}
