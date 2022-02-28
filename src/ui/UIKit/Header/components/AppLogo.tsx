import React from 'react'
import { Box, useTheme } from '@mui/material'
import { ReactComponent as InvestaXLight } from 'assets/icons/new_logo-light_theme.svg'
import { ReactComponent as InvestaXDark } from 'assets/icons/new_logo-dark_theme.svg'

export const AppLogo = () => {
  const theme = useTheme()

  return (
    <Box display={'flex'}>
      {theme.palette.mode === 'light' ? <InvestaXLight /> : <InvestaXDark />}
    </Box>
  )
}
