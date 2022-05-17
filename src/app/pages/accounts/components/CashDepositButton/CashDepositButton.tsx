import { Button } from '@mui/material'
import { VirtualAccountCashDeposit } from 'app/pages/accounts/components/VirtualAccountCashDeposit/VirtualAccountCashDeposit'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { FormDialog } from 'components/FormDialog/FormDialog'
import { FormDialogContent } from 'components/FormDialog/FormDialogContent'
import { FormDialogTitle } from 'components/FormDialog/FormDialogTitle'
import React, { useState } from 'react'

export interface CashDepositButtonProps {
  virtualAccountId?: string
}

export const CashDepositButton = ({
  virtualAccountId
}: CashDepositButtonProps) => {
  const [open, setOpen] = useState(false)
  const { data, isLoading } = useVirtualAccount(virtualAccountId)

  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  if (data === undefined || isLoading) {
    return null
  }

  return (
    <>
      <Button
        color='primary'
        variant='contained'
        onClick={openDialog}
        disableElevation
      >
        CASH DEPOSIT
      </Button>
      <FormDialog maxWidth='sm' open={open} onClose={closeDialog}>
        <FormDialogTitle
          label='Deposit to Virtual Account'
          onClose={closeDialog}
        />
        <FormDialogContent noPadding>
          <VirtualAccountCashDeposit virtualAccountDetails={data} />
        </FormDialogContent>
      </FormDialog>
    </>
  )
}
