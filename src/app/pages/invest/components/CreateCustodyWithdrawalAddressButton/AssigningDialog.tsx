import React from 'react'
import { Box, DialogContent, DialogTitle } from '@mui/material'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { LoadingMessage } from 'app/pages/invest/components/GetWalletDialog/LoadingMessage'

export interface AssigningDialogProps {
  open: boolean
}

export const AssigningDialog = ({ open }: AssigningDialogProps) => {
  return (
    <UIDialog maxWidth='sm' open={open}>
      <DialogTitle>
        <Box pt={3}>
          We are assigning you a <br /> withdrawal address
        </Box>
      </DialogTitle>
      <DialogContent>
        <LoadingMessage message='Please wait...' />
      </DialogContent>
    </UIDialog>
  )
}
