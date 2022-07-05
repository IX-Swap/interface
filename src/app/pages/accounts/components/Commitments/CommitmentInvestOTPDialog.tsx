import {
  DialogTitle,
  Typography,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { OTPDialogContent } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/OTPDialog'
import React from 'react'
import { UIDialog } from 'ui/UIDialog/UIDialog'

interface CommitmentInvestOTPDialogProps {
  close: () => void
  open: boolean
}

export const CommitmentInvestOTPDialog = ({
  close,
  open
}: CommitmentInvestOTPDialogProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <UIDialog
      disablePortal
      open={open}
      maxWidth={isMobile ? 'sm' : 'md'}
      onClose={close}
      sx={{
        maxWidth: '100vw',
        maxHeight: '100vh'
      }}
      PaperProps={{
        sx: {
          m: isMobile ? 1 : undefined,
          p: isMobile ? '40px 0' : undefined
        }
      }}
    >
      <Box py={{ xs: 1, md: 4 }} px={{ xs: 1, md: 10 }}>
        <DialogTitle sx={{ p: isMobile ? 3 : undefined }}>
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
    </UIDialog>
  )
}
