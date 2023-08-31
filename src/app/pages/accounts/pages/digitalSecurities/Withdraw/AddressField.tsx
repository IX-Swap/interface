import { WalletAddressSelect } from 'app/pages/accounts/components/WalletAddressSelect'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
// import { TextInput } from 'ui/TextInput/TextInput'

export const AddressField = () => {
  const { control } = useFormContext()
  // const addressType = watch('addressType', 'new')

  return (
    <TypedField
      control={control}
      name='existingAddress'
      variant='outlined'
      fullWidth
      label='Select Address'
      component={WalletAddressSelect}
    />
  )
}
