import React from 'react'
import { Grid } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { TokenHoldingsSelect } from 'app/pages/accounts/components/TokenHoldingsSelect'

export const WithdrawSecurityTokenField = () => {
  const { control, watch } = useFormContext()
  const tokenType = watch('tokenType')

  return (
    <Grid container alignItems='center' spacing={2}>
      <Grid item xs>
        <TypedField
          control={control}
          component={TokenHoldingsSelect}
          type={tokenType}
          name='token'
          label={tokenType === 'Security' ? 'Security Token' : 'Stablecoin'}
          variant='outlined'
          fullWidth
        />
      </Grid>
    </Grid>
  )
}
