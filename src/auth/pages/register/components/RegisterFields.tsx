import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { SignupArgs } from 'types/auth'

export const RegisterFields = () => {
  const { control } = useFormContext<SignupArgs>()

  return (
    <>
      <Grid item>
        <TypedField
          control={control}
          component={Input}
          name='name'
          label='Name'
        />
      </Grid>
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
    </>
  )
}
