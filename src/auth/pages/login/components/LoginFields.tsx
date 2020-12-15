import React from 'react'
import { Grid, Input, TextField } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { LoginArgs } from 'types/auth'
import useStyles from 'auth/styles'
import { privateClassNames } from 'helpers/classnames'

export const LoginFields = () => {
  const { control } = useFormContext<LoginArgs>()
  const classes = useStyles()

  return (
    <>
      <Grid item>
        <TypedField
          control={control}
          component={Input}
          name='email'
          label='Email Address'
          type='email'
        />
      </Grid>

      <Grid item>
        <TypedField
          control={control}
          component={Input}
          name='password'
          label='Password'
          type='password'
        />
      </Grid>

      <Grid item className={classes.otp}>
        <TypedField
          customRenderer
          fullWidth
          control={control}
          component={TextField}
          name='otp'
          label='OTP Code (optional)'
          variant='outlined'
          autoComplete='off'
          className={privateClassNames()}
        />
      </Grid>
    </>
  )
}
