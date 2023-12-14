import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { DeployedSecurityTokenSelect } from 'app/pages/accounts/components/DeployedSecurityTokenSelect'
import { useDepositAddress } from 'app/pages/accounts/hooks/useDepositAddress'

export const DepositSecurityTokenField = () => {
  const { control, watch, setValue } = useFormContext()
  const token = watch('token')

  const { data } = useDepositAddress(token?._id)
  const address = data?.address

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setValue('depositAddress', address), [address])

  return (
    <Grid container alignItems='center' spacing={2}>
      <Grid item xs>
        <TypedField
          control={control}
          component={DeployedSecurityTokenSelect}
          name='token'
          label='Security Token'
          variant='outlined'
          fullWidth
        />
        <input {...control.register('depositAddress')} hidden />
      </Grid>
    </Grid>
  )
}