import React from 'react'
import { Box, IconButton } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
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
        size='large'
      >
        <MenuIcon />
      </IconButton>
    </Box>
  )
}
