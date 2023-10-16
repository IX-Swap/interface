import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { Grid, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { RequestPasswordResetArgs } from 'types/auth'

export const ResendFields = () => {
  const { control } = useFormContext<RequestPasswordResetArgs>()

  return (
    <Grid item>
      <TypedField
        control={control}
        component={TextField}
        fullWidth
        name='email'
        label='Email Address'
        placeholder={'Email Address'}
        InputLabelProps={{
          shrink: true
        }}
      />
    </Grid>
  )
}
