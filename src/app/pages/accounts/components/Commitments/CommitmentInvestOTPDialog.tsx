import { Dialog, DialogTitle, Typography, Box } from '@material-ui/core'
import { OTPDialogContent } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/OTPDialog'
import React from 'react'

interface CommitmentInvestOTPDialogProps {
  close: () => void
  open: boolean
}

export const CommitmentInvestOTPDialog = ({
  close,
  open
}: CommitmentInvestOTPDialogProps) => {
  return (
    <Dialog disablePortal open={open} maxWidth='md' onBackdropClick={close}>
      <Box py={4} px={10}>
        <DialogTitle>
          <Typography
            variant='h5'
            align='center'
            style={{ textTransform: 'capitalize' }}
          >
            Are you sure you want to invest in this deal?
          </Typography>
        </DialogTitle>
        <Box py={2}>
          <Typography component='p' variant='body1' align='center'>
            The required balance will be deducted from your account
          </Typography>
        </Box>
        <OTPDialogContent close={close} actionLabel='Confirm' />
      </Box>
    </Dialog>
  )
}
