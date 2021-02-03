import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { Grid, TextField } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { RequestPasswordResetArgs } from 'types/auth'

export const RequestFields = () => {
  const { control } = useFormContext<RequestPasswordResetArgs>()

  return (
    <Grid item>
      <TypedField
        control={control}
        customRenderer
        component={TextField}
        variant='outlined'
        fullWidth
        name='email'
        label='Email Address'
      />
    </Grid>
  )
}
