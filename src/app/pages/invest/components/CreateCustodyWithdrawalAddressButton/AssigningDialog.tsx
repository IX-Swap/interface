import React from 'react'
import { Dialog, Box, Typography, DialogContent } from '@mui/material'
import { LoadingMessage } from 'app/pages/invest/components/GetWalletDialog/LoadingMessage'

export interface AssigningDialogProps {
  open: boolean
}

export const AssigningDialog = ({ open }: AssigningDialogProps) => {
  return (
    <Dialog open={open}>
      <Box p={4}>
        <Typography variant='subtitle1' align='center'>
          We Are Assigning You a Withdrawal Address
        </Typography>
        <DialogContent>
          <LoadingMessage message='Please wait' />
        </DialogContent>
      </Box>
    </Dialog>
  )
}
