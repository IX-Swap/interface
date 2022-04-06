import React from 'react'
import { IconButton } from '@mui/material'
import { DropdownTriggerProps } from 'app/components/Dropdown/Dropdown'
import { CustomAvatar } from 'ui/CustomAvatar'
import { useStyles } from 'app/components/NewHeader/components/UserDropdown/UserDropdownTrigger/UserDropdownTrigger.styles'
import classnames from 'classnames'
// TODO Remove mocked hook after demo
import { useAuth } from 'app/components/NewHeader/hooks/mock/useAuth'
// import { useAuth } from 'hooks/auth/useAuth'

export const UserDropdownTrigger = (props: DropdownTriggerProps) => {
  const classes = useStyles({ isOpen: props.injectedProps.isOpen })
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
      disableTouchRipple
      className={classnames(classes.wrapper, {
        [classes.opened]: props.injectedProps.isOpen
      })}
    >
      {/* TODO Needs to add view photo functionality, as in old Avatar component */}
      <CustomAvatar>{user.name[0]}</CustomAvatar>
    </IconButton>
  )
}
