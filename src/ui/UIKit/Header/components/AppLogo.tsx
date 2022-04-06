import React from 'react'
import { Link } from 'react-router-dom'
import { Box, useTheme } from '@mui/material'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { ReactComponent as InvestaXLight } from 'assets/icons/new_logo-light_theme.svg'
import { ReactComponent as InvestaXDark } from 'assets/icons/new_logo-dark_theme.svg'

export const AppLogo = () => {
  const theme = useTheme()

  return (
    <Box display={'flex'}>
      <Link to={IdentityRoute.list}>
        {theme.palette.mode === 'light' ? <InvestaXLight /> : <InvestaXDark />}
      </Link>
    </Box>
  )
}
