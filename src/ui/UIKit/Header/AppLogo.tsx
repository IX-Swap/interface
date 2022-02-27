import React from 'react'
import { Grid, useTheme } from '@mui/material'
import { ReactComponent as InvestaXLight } from 'assets/icons/new_logo-light_theme.svg'
import { ReactComponent as InvestaXDark } from 'assets/icons/new_logo-dark_theme.svg'

export const AppLogo = () => {
  const theme = useTheme()

  return (
    <Grid>
      {theme.palette.mode === 'light' ? <InvestaXLight /> : <InvestaXDark />}
    </Grid>
  )
}
