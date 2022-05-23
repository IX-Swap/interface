import React from 'react'
import { Grid } from '@mui/material'
import { useStyles } from 'app/pages/security/components/Layout2fa/Layout2fa.styles'

export interface Layout2faProps {
  content: JSX.Element
  stepper: JSX.Element
  buttons: JSX.Element
}

export const Layout2fa = ({ content, stepper, buttons }: Layout2faProps) => {
  const classes = useStyles()

  return (
    <>
      <Grid container className={classes.wrapper} justifyContent={'center'}>
        <Grid item className={classes.leftBlock}>
          {content}
        </Grid>
        <Grid
          item
          container
          flexDirection={'column'}
          className={classes.rightBlock}
        >
          {stepper}
        </Grid>
      </Grid>
      {buttons}
    </>
  )
}
