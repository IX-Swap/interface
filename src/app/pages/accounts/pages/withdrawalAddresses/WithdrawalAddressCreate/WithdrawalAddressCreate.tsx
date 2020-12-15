import React from 'react'
import { WADialog } from 'app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialog'
import { WADialogTitle } from 'app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogTitle'
import { WADialogContent } from 'app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogContent'
import { WAFormWrapper } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAFormWrapper'

export const WithdrawalAddressCreate = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <WADialog open={isOpen}>
      <WADialogTitle label='Add Withdrawal Address' />
      <WADialogContent>
        <WAFormWrapper />
      </WADialogContent>
    </WADialog>
  )
}
