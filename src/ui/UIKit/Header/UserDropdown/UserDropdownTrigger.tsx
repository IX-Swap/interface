import React from 'react'
import { IconButton } from '@mui/material'
import { DropdownTriggerProps } from 'app/components/Dropdown/Dropdown'
import { CustomAvatar } from 'ui/CustomAvatar'

export const UserDropdownTrigger = (props: DropdownTriggerProps) => {
  return (
    <IconButton
      {...props.triggerProps}
      color='inherit'
      aria-haspopup='true'
      aria-controls='profile-menu'
      size='large'
    >
      {/* TODO Needs to implement logic here for using avatar or get name first letter */}
      <CustomAvatar>A</CustomAvatar>
    </IconButton>
  )
}
