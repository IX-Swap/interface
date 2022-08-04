import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { ReactComponent as InvestaXLight } from 'assets/icons/new_logo-light_theme.svg'
import { ReactComponent as InvestaXDark } from 'assets/icons/new_logo-dark_theme.svg'
import { useStyles } from 'app/components/Header/components/AppLogo/AppLogo.styles'
import { AppRoute } from 'app/router/config'

export const AppLogo = () => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <Link to={AppRoute.home} className={classes.wrapper}>
      {theme.palette.mode === 'light' ? <InvestaXLight /> : <InvestaXDark />}
    </Link>
  )
}
