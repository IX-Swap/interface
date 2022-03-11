import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { ReactComponent as CongratsIcon } from 'assets/icons/congrats.svg'
import { history } from 'config/history'
import { SecurityRoute } from 'app/pages/security/router/config'
import { useStyles } from './Enabled.styles'

export const Enabled = () => {
  const classes = useStyles()
  return (
    <Grid container direction='column' alignItems='center'>
      <Grid item container alignItems={'center'} justifyContent={'center'}>
        <Grid>
          <Typography align='center' variant='h4'>
            2-FA Has Been Updated Successfully.
          </Typography>
        </Grid>
        <Grid>
          <CongratsIcon />
        </Grid>
      </Grid>
      <Grid item>
        <Typography align='center' variant='body1' className={classes.text}>
          Your account is now protected by Two-Factor Authentication (2-FA).
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color={'primary'}
          variant={'contained'}
          onClick={() => history.push(SecurityRoute.landing)}
        >
          Ok
        </Button>
      </Grid>
    </Grid>
  )
}
