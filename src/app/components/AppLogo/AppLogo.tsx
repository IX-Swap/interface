import React from 'react'
import { ReactComponent as InvestaX } from 'assets/icons/app-logo.svg'
import { ReactComponent as InvestaXColor } from 'assets/icons/logo-color.svg'
import { Grid } from '@material-ui/core'
import { useStyles } from 'app/components/AppLogo/AppLogo.styles'

export interface AppLogoProps {
  color?: boolean
}
export const AppLogo = ({ color = false }: AppLogoProps) => {
  const classes = useStyles()

  return (
    <Grid className={classes.container}>
      {color ? <InvestaXColor /> : <InvestaX />}
    </Grid>
  )
}
