import React from 'react'
import { ReactComponent as InvestaX } from 'assets/icons/app-logo.svg'
import { Grid } from '@material-ui/core'
import { useStyles } from 'v2/app/components/AppLogo/AppLogo.styles'

export const AppLogo = () => {
  const classes = useStyles()

  return (
    <Grid className={classes.container}>
      <InvestaX />
    </Grid>
  )
}
