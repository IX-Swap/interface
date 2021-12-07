import { Grid } from '@material-ui/core'
import { NetworkSelect } from 'components/form/NetworkSelect'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import React from 'react'

export const WABaseFields = () => {
  const { control, watch } = useFormContext<WithdrawalAddressFormValues>()
  const wallet = watch('wallet')
  const hasWallet = wallet !== undefined

  return (
    <Grid item>
      <TypedField
        control={control}
        component={NetworkSelect}
        name='network'
        label='Blockchain Network'
        disabled={hasWallet}
        variant='outlined'
      />
    </Grid>
  )
}
