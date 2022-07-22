import React from 'react'
import { useWithdrawalAddresses } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddresses'
import { TypedField } from 'components/form/TypedField'
import { WithdrawalAddressSelect } from 'components/form/WithdrawalAddressSelect'
import { useFormContext } from 'react-hook-form'

export const AddressSelect = () => {
  const { control } = useFormContext()
  const { data, status } = useWithdrawalAddresses({})
  const filteredAddresses = data.list.filter(
    ({ status }) => status === 'Approved'
  )
  const hasFilteredAddresses = filteredAddresses.length > 0

  return (
    <TypedField
      component={WithdrawalAddressSelect}
      control={control}
      name='withdrawalAddress'
      label='Destination Wallet Address'
      placeholder={
        !hasFilteredAddresses && status !== 'loading'
          ? 'You do not have wallet addresses'
          : 'Select walet'
      }
      disabled={!hasFilteredAddresses}
      displayEmpty
      list={filteredAddresses}
      status={status}
    />
  )
}
