import React, { useEffect } from 'react'
import { Badge, IconButton } from '@mui/material'
import { DropdownTriggerProps } from 'app/components/Dropdown/Dropdown'
import { useStyles } from './TwoFADropdownTrigger.styles'
import { Icon } from 'ui/Icons/Icon'
import classnames from 'classnames'
import { useAuth } from 'hooks/auth/useAuth'

export const TwoFADropdownTrigger = (props: DropdownTriggerProps) => {
  const { user = { enable2Fa: undefined } } = useAuth()
  const { enable2Fa } = user
  const classes = useStyles()

  useEffect(() => {
    if (enable2Fa === undefined) {
      return props.injectedProps.open()
    }
  }, [enable2Fa]) // eslint-disable-line

  return (
    <IconButton
      className={classnames(classes.wrapper, {
        [classes.opened]: props.injectedProps.isOpen
      })}
      color='inherit'
      disableTouchRipple
      {...props?.triggerProps}
    >
      <Badge variant={'dot'} color={enable2Fa === true ? 'success' : 'error'}>
        <Icon name='security' />
      </Badge>
    </IconButton>
  )
}
