import React from 'react'
import { IconButton } from '@mui/material'
import { DropdownTriggerProps } from 'app/components/Dropdown/Dropdown'
import { CustomAvatar } from 'ui/CustomAvatar'
import { useStyles } from 'ui/UIKit/Header/UserDropdown/UserDropdownTrigger/UserDropdownTrigger.styles'
import { useAuth } from 'hooks/auth/useAuth'

export const UserDropdownTrigger = (props: DropdownTriggerProps) => {
  const classes = useStyles()
  const { user } = useAuth()

  if (user === undefined) {
    return null
  }

  return (
    <IconButton
      {...props.triggerProps}
      color='inherit'
      aria-haspopup='true'
      aria-controls='profile-menu'
      size='large'
      className={classes.button}
    >
      <CustomAvatar>{user.name[0]}</CustomAvatar>
    </IconButton>
  )
}
