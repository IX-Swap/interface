import React from 'react'
import { WADialog } from '../WADialog/WADialog'
import { WADialogTitle } from '../WADialog/WADialogTitle'
import { WADialogContent } from '../WADialog/WADialogContent'
import { WAFormWrapper } from './WAFormWrapper'

export const WithdrawalAddressesCreate = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <WADialog open={isOpen}>
      <WADialogTitle label='Add Withdrawal Address' />
      <WADialogContent>
        <WAFormWrapper />
      </WADialogContent>
    </WADialog>
  )
}
