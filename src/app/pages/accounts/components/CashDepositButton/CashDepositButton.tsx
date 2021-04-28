import { Button } from '@material-ui/core'
import { VirtualAccountCashDeposit } from 'app/pages/accounts/components/VirtualAccountCashDeposit/VirtualAccountCashDeposit'
import { FormDialog } from 'components/FormDialog/FormDialog'
import { FormDialogContent } from 'components/FormDialog/FormDialogContent'
import { FormDialogTitle } from 'components/FormDialog/FormDialogTitle'
import React, { useState } from 'react'

export const CashDepositButton = () => {
  const [open, setOpen] = useState(true)

  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
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
      <FormDialog maxWidth='md' open={open} onBackdropClick={closeDialog}>
        <FormDialogTitle
          label='Desposit to Virtual Account'
          onClose={closeDialog}
        />
        <FormDialogContent noPadding>
          <VirtualAccountCashDeposit />
        </FormDialogContent>
      </FormDialog>
    </>
  )
}
