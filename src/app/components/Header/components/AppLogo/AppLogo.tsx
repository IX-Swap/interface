import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { ReactComponent as InvestaXLight } from 'assets/icons/new_logo-light_theme.svg'
import { ReactComponent as InvestaXDark } from 'assets/icons/new_logo-dark_theme.svg'
import { useStyles } from 'app/components/Header/components/AppLogo/AppLogo.styles'
import { AppRoute } from 'app/router/config'
import { DataroomImage } from 'ui/DataroomImage'

export const AppLogo = () => {
  const theme = useTheme()
  const classes = useStyles()
  const isLightTheme = theme.palette.mode === 'light'
  const logoTheme = isLightTheme ? 'logoLight' : 'logoDark'

  const Logo =
    localStorage.getItem(logoTheme) !== 'undefined' ? (
      <DataroomImage
        photoId={JSON.parse(localStorage.getItem(logoTheme) ?? '') ?? ''}
        alt='Logo'
        // width={60}
        // height={60}
      />
    ) : isLightTheme ? (
      <InvestaXLight />
    ) : (
      <InvestaXDark />
    )

  return (
    <Link to={AppRoute.home} className={classes.wrapper}>
      {Logo}
    </Link>
  )
}
