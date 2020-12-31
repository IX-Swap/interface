import React from 'react'
import { Badge, IconButton } from '@material-ui/core'
import { ReactComponent as Notifications } from 'assets/icons/navigation/notifications.svg'
import { DropdownTriggerProps } from 'app/components/Dropdown/Dropdown'
import { useNotifications } from 'app/pages/notifications/hooks/useNotifications'

export const NotificationsDropdownTrigger = (
  props: Partial<DropdownTriggerProps>
) => {
  const { unreadCount } = useNotifications()

  return (
    <IconButton {...props.triggerProps} style={{ color: 'white' }}>
      <Badge
        badgeContent={unreadCount >= 100 ? '99+' : unreadCount}
        color='error'
      >
        <Notifications />
      </Badge>
    </IconButton>
  )
}
