import React from 'react'
import { Box, Typography, DialogContent } from '@mui/material'
import { LoadingMessage } from 'app/pages/exchange/components/GetWalletDialog/LoadingMessage'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export interface AssigningDialogProps {
  open: boolean
}

export const AssigningDialog = ({ open }: AssigningDialogProps) => {
  return (
    <UIDialog open={open}>
      <Box p={4}>
        <Typography variant='subtitle1' align='center'>
          We Are Assigning You a Withdrawal Address
        </Typography>
        <DialogContent>
          <LoadingMessage message='Please wait' />
        </DialogContent>
      </Box>
    </UIDialog>
  )
}
