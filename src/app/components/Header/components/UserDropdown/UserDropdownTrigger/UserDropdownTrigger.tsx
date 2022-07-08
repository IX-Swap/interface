import React from 'react'
import { IconButton } from '@mui/material'
import { DropdownTriggerProps } from 'app/components/Dropdown/Dropdown'
import { CustomAvatar } from 'ui/CustomAvatar'
import { useStyles } from 'app/components/Header/components/UserDropdown/UserDropdownTrigger/UserDropdownTrigger.styles'
import classnames from 'classnames'
import { useAuth } from 'hooks/auth/useAuth'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'

export const UserDropdownTrigger = (props: DropdownTriggerProps) => {
  const classes = useStyles({ isOpen: props.injectedProps.isOpen })
  const { user } = useAuth()
  const { data } = useIndividualIdentity()

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
      <CustomAvatar documentId={data?.photo} ownerId={user._id}>
        {user.name[0]}
      </CustomAvatar>
    </IconButton>
  )
}
