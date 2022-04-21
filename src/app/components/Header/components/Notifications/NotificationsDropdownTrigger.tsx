import React from 'react'
import { Badge, IconButton } from '@mui/material'
import { DropdownTriggerProps } from 'app/components/Dropdown/Dropdown'
import { useNotifications } from 'app/pages/notifications/hooks/useNotifications'
import { useStyles } from 'app/components/Header/components/Dropdown/DropdownTrigger.styles'
import { Icon } from 'ui/Icons/Icon'
import classnames from 'classnames'

export const NotificationsDropdownTrigger = (
  props: Partial<DropdownTriggerProps>
) => {
  const classes = useStyles()
  const { unreadCount } = useNotifications()

  return (
    <IconButton
      className={classnames(classes.wrapper, {
        [classes.opened]: props.injectedProps?.isOpen
      })}
      color='inherit'
      disableTouchRipple
      {...props?.triggerProps}
    >
      <Badge variant={unreadCount > 0 ? 'dot' : 'standard'} color='error'>
        <Icon name='bell' />
      </Badge>
    </IconButton>
  )
}
