import { Box } from '@material-ui/core'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { WAConnect } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAConnect'
import { WACreate } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WACreate'
import { WAOfferToCreateWallet } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAOfferToCreateWallet/WAOfferToCreateWallet'

export interface WAFormContentProps {
  onLinkClick: () => void
}

export const WAFormContent = ({ onLinkClick }: WAFormContentProps) => {
  const { watch } = useFormContext<WithdrawalAddressFormValues>()
  const variant = watch('variant')
  const isCreate = variant === 'create'
  const isConnect = variant === 'connect'

  if (isConnect) {
    return <WAConnect onLinkClick={onLinkClick} />
  }

  if (isCreate) {
    return <WACreate onLinkClick={onLinkClick} />
  }

  return (
    <>
      <WAOfferToCreateWallet onClick={() => onLinkClick()} />
      <Box height={16} />
    </>
  )
}
