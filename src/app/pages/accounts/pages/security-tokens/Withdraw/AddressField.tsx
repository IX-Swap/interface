import { WalletAddressSelect } from 'app/pages/accounts/components/WalletAddressSelect'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const AddressField = () => {
  const { control } = useFormContext()
  // const addressType = watch('addressType', 'new')

  return (
    <TypedField
      control={control}
      name='wallet'
      variant='outlined'
      fullWidth
      label='Withdraw To'
      helperText='Select Wallet Address'
      component={WalletAddressSelect}
    />
  )
}
