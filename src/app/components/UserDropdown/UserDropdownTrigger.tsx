import React from 'react'
import { ReactComponent as UserIcon } from 'assets/icons/navigation/user.svg'
import { IconButton } from '@material-ui/core'
import { DropdownTriggerProps } from 'app/components/Dropdown/Dropdown'

export const UserDropdownTrigger = (props: DropdownTriggerProps) => {
  return (
    <IconButton
      {...props.triggerProps}
      color='inherit'
      aria-haspopup='true'
      aria-controls='profile-menu'
    >
      <UserIcon />
    </IconButton>
  )
}
