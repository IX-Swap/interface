import React from 'react'
import { Box, IconButton } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import { useAppActions } from 'app/hooks/useAppState'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const NavDrawerToggle = () => {
  const { setNavDrawerOpened } = useAppActions()
  const { isTablet } = useAppBreakpoints()

  if (!isTablet) {
    return null
  }

  return (
    <Box marginRight={1}>
      <IconButton
        edge='start'
        color='inherit'
        onClick={() => setNavDrawerOpened(true)}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  )
}
