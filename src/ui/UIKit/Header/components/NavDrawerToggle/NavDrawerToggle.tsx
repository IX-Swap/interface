import React from 'react'
import { Box, IconButton } from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { Dropdown } from 'ui/UIKit/Header/components/Dropdown/Dropdown'
import { DropdownTriggerProps } from 'app/components/Dropdown/Dropdown'
import { NavigationMobile } from 'ui/UIKit/Header/components/NavigationMobile/NavigationMobile'
import useStyles from 'ui/UIKit/Header/components/NavDrawerToggle/NavDrawerToggle.styles'

export const NavDrawerToggle = () => {
  const { isDesktop } = useAppBreakpoints()

  if (isDesktop) {
    return null
  }

  const Trigger = (props: DropdownTriggerProps) => {
    const classes = useStyles()

    return (
      <Box marginRight={1}>
        <IconButton
          {...props.triggerProps}
          edge='start'
          color='inherit'
          size='large'
          className={classes.button}
        >
          {props.injectedProps.isOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
    )
  }

  return (
    <Dropdown
      trigger={Trigger}
      content={NavigationMobile}
      placement={'bottom-start'}
    />
  )
}
