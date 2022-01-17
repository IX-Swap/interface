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
        component={TextField}
        fullWidth
        name='email'
        label='Email'
        placeholder={'Email'}
        InputLabelProps={{
          shrink: true
        }}
      />
    </Grid>
  )
}
