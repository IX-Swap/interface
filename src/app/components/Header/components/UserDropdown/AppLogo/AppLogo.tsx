import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { ReactComponent as InvestaXLight } from 'assets/icons/new_logo-light_theme.svg'
import { ReactComponent as InvestaXDark } from 'assets/icons/new_logo-dark_theme.svg'

export const AppLogo = () => {
  const theme = useTheme()

  return (
    <Link
      to={IdentityRoute.list}
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        webkitTapHighlightColor: 'transparent'
      }}
    >
      {theme.palette.mode === 'light' ? <InvestaXLight /> : <InvestaXDark />}
    </Link>
  )
}
