import React from 'react'
import { Badge, IconButton } from '@mui/material'
import { DropdownTriggerProps } from 'app/components/Dropdown/Dropdown'
import { useNotifications } from 'app/pages/notifications/hooks/useNotifications'
import { Icon } from 'ui/Icons/Icon'
import { useStyles } from './NotificationsDropdownTrigger.styles'

export const NotificationsDropdownTrigger = (
  props: Partial<DropdownTriggerProps>
) => {
  const classes = useStyles()
  const { unreadCount } = useNotifications()

  return (
    <IconButton
      {...props.triggerProps}
      className={classes.wrapper}
      size='large'
    >
      <Badge
        badgeContent={unreadCount >= 100 ? '99+' : unreadCount}
        color='error'
      >
        <Icon name='bell' />
      </Badge>
    </IconButton>
  )
}
