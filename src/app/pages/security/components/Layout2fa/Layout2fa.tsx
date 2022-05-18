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
      <Grid
        container
        xs={12}
        className={classes.wrapper}
        justifyContent={'center'}
      >
        <Grid className={classes.leftBlock}>
          <Grid item>{content}</Grid>
        </Grid>
        <Grid
          item
          container
          flexDirection={'column'}
          className={classes.rightBlock}
        >
          <Grid item>{stepper}</Grid>
        </Grid>
      </Grid>
      <Grid item>{buttons}</Grid>
    </>
  )
}
