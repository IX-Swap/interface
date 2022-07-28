import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'
import { AddBankAccountButton } from 'app/pages/accounts/pages/withdraw/components/AddBankAccountButton'
import React from 'react'

export const Header = () => {
  return (
    <TwoFADialogWrapper>
      <AddBankAccountButton variant='contained' />
    </TwoFADialogWrapper>
  )
}
