import React from 'react'
import { Grid } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { TokenHoldingsSelect } from 'app/pages/accounts/components/TokenHoldingsSelect'

export const WithdrawSecurityTokenField = () => {
  const { control } = useFormContext()

  return (
    <Grid container alignItems='center' spacing={2}>
      <Grid item xs>
        <TypedField
          control={control}
          component={TokenHoldingsSelect}
          name='token'
          label='Security Token'
          variant='outlined'
          fullWidth
        />
      </Grid>
    </Grid>
  )
}
