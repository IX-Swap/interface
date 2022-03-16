import React from 'react'
import { Badge, IconButton } from '@mui/material'
import { DropdownTriggerProps } from 'app/components/Dropdown/Dropdown'
// import { useNotifications } from 'app/pages/notifications/hooks/useNotifications'
import { useStyles } from './NotificationsDropdownTrigger.styles'
import { Icon } from 'ui/Icons/Icon'
import classnames from 'classnames'

export const NotificationsDropdownTrigger = (props: DropdownTriggerProps) => {
  const classes = useStyles()

  // TODO Remove mocked value after demo
  const unreadCount = 1
  // const { unreadCount } = useNotifications()

  return (
    <IconButton
      className={classnames(classes.wrapper, {
        [classes.opened]: props.injectedProps.isOpen
      })}
      color='inherit'
      disableTouchRipple
      {...props?.triggerProps}
    >
      <Badge variant={unreadCount > 0 ? 'dot' : 'standard'} color='error'>
        {/* TODO Needs to fix this component, size props doesn't work */}
        <Icon name='bell' />
      </Badge>
    </IconButton>
  )
}
