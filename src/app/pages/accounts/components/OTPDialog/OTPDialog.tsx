import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material'
import { WithdrawCashFormValues } from 'app/pages/accounts/types'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { OTPInputField } from 'app/pages/accounts/components/OTPDialog/OTPInputField'

export const OTPDialogContent = ({
  close,
  content,
  actionLabel
}: Pick<OTPDialogProps, 'close' | 'content' | 'actionLabel'>) => {
  const { watch, formState } = useFormContext<WithdrawCashFormValues>()
  const otpValue = watch('otp')

  return (
    <>
      <DialogContent sx={{ px: 0 }}>
        {content !== undefined ? <>{content}</> : null}
        <OTPInputField disabled={false} />
      </DialogContent>
      <VSpacer size='small' />
      <DialogActions>
        <Grid container spacing={2} justifyContent='center'>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant='outlined'
              color='primary'
              size='large'
              onClick={close}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              disableElevation
              disabled={
                otpValue === undefined ||
                otpValue === null ||
                otpValue === '' ||
                otpValue.length < 6 ||
                formState.isSubmitting
              }
            >
              {actionLabel ?? 'Withdraw'}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
      <VSpacer size='medium' />
    </>
  )
}
interface OTPDialogProps {
  close: () => void
  open: boolean
  title?: string
  content?: React.ReactNode
  actionLabel?: string
}

export const OTPDialog = (props: OTPDialogProps) => {
  const { close, open, title } = props

  return (
    <UIDialog open={open} maxWidth='sm' onClose={close}>
      <DialogTitle>
        <Box textAlign='center' mt={3}>
          <Typography variant='h3'>{title ?? 'Cash Withdrawal'}</Typography>
        </Box>
      </DialogTitle>
      <OTPDialogContent {...props} />
    </UIDialog>
  )
}
