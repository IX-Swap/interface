import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { ReactComponent as InvestaXLight } from 'assets/icons/new_logo-light_theme.svg'
import { ReactComponent as InvestaXDark } from 'assets/icons/new_logo-dark_theme.svg'
import { useStyles } from 'app/components/Header/components/AppLogo/AppLogo.styles'
import { AppRoute } from 'app/router/config'
import { DataroomImage } from 'ui/DataroomImage'
import { useServices } from 'hooks/useServices'

export const AppLogo = () => {
  const theme = useTheme()
  const classes = useStyles()
  const isLightTheme = theme.palette.mode === 'light'
  const logoTheme = isLightTheme ? 'logoLight' : 'logoDark'

  const { sessionService } = useServices()

  const tenantLogo: string = sessionService.get(logoTheme) ?? ''
  const defaultLogo = isLightTheme ? <InvestaXLight /> : <InvestaXDark />

  const Logo =
    tenantLogo !== '' ? (
      <DataroomImage
        photoId={tenantLogo}
        alt='Logo'
        width={80}
        height={14}
        variant={'square'}
      >
        {defaultLogo}
      </DataroomImage>
    ) : (
      defaultLogo
    )

  return (
    <Link to={AppRoute.dashboard} className={classes.wrapper}>
      {Logo}
    </Link>
  )
}
