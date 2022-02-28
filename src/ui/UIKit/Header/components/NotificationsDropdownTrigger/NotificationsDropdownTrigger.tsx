import React from 'react'
import { Badge, IconButton } from '@mui/material'
import { DropdownTriggerProps } from 'app/components/Dropdown/Dropdown'
import { useNotifications } from 'app/pages/notifications/hooks/useNotifications'
import { ReactComponent as BellIcon } from 'assets/icons/bell.svg'
import { useStyles } from 'ui/UIKit/Header/components/NotificationsDropdownTrigger/NotificationsDropdownTrigger.styles'

export const NotificationsDropdownTrigger = (props: DropdownTriggerProps) => {
  const classes = useStyles({ isOpen: props.injectedProps.isOpen })
  const { unreadCount } = useNotifications()

  return (
    <IconButton
      {...props.triggerProps}
      className={classes.wrapper}
      size='large'
    >
      <Badge variant={unreadCount > 0 ? 'dot' : 'standard'} color='error'>
        <BellIcon />
      </Badge>
    </IconButton>
  )
}
