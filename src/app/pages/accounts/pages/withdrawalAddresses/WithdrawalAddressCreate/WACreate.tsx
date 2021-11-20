import React, { ReactElement } from 'react'
import { WACreateActions } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WACreateActions'
import { WACreateFields } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WACreateFields'

export interface WACreateProps {
  hint: ReactElement
}

export const WACreate = ({ hint }: WACreateProps) => {
  return (
    <>
      <WACreateFields />
      {hint}
      <WACreateActions />
    </>
  )
}
