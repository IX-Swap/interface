import React from 'react'
import { Dialog, Box, Typography, DialogContent } from '@material-ui/core'
import { LoadingMessage } from 'app/pages/exchange/components/GetWalletDialog/LoadingMessage'

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
