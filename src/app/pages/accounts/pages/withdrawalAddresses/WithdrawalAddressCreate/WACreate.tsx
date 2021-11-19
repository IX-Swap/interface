import React from 'react'
import { WACreateActions } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WACreateActions'
import { WACreateFields } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WACreateFields'
import { WAOfferToCreateWallet } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAOfferToCreateWallet/WAOfferToCreateWallet'

export interface WACreateProps {
  onLinkClick: () => void
}

export const WACreate = ({ onLinkClick }: WACreateProps) => {
  return (
    <>
      <WACreateFields />
      <WAOfferToCreateWallet onClick={() => onLinkClick()} />
      <WACreateActions />
    </>
  )
}
