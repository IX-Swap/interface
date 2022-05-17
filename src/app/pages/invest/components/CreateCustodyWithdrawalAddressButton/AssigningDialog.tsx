import React from 'react'
import { DialogContent, DialogTitle } from '@mui/material'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { LoadingMessage } from 'app/pages/invest/components/GetWalletDialog/LoadingMessage'

export interface AssigningDialogProps {
  open: boolean
}

export const AssigningDialog = ({ open }: AssigningDialogProps) => {
  return (
    <UIDialog maxWidth='sm' open={open}>
      <DialogTitle style={{ textAlign: 'center', padding: 24 }}>
        We Are Assigning You a <br /> Withdrawal Address
      </DialogTitle>
      <DialogContent>
        <LoadingMessage message='Please wait' />
      </DialogContent>
    </UIDialog>
  )
}
