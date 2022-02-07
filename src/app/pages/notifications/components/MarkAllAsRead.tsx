import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import { useMarkAllAsRead } from 'app/pages/notifications/hooks/useMarkAllAsRead'
import { useNotifications } from 'app/pages/notifications/hooks/useNotifications'

export const MarkAllAsRead = (props: ButtonProps) => {
  const { unreadCount } = useNotifications()
  const [mutation, { isLoading }] = useMarkAllAsRead()

  return (
    <Button
      style={{ textTransform: 'none' }}
      color='primary'
      variant='text'
      {...props}
      onClick={async () => await mutation()}
      disabled={unreadCount === 0 || isLoading}
    >
      Mark All As Read
    </Button>
  )
}
