import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Box
} from '@material-ui/core'
import { WithdrawCashFormValues } from 'app/pages/accounts/types'
import { OTPField } from 'components/form/OTPField'
import { TypedField } from 'components/form/TypedField'
import { VSpacer } from 'components/VSpacer'
import { plainValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'

interface CommitmentInvestOTPDialogProps {
  close: () => void
  open: boolean
}

export const CommitmentInvestOTPDialog = ({
  close,
  open
}: CommitmentInvestOTPDialogProps) => {
  const { control, watch, formState } = useFormContext<WithdrawCashFormValues>()
  const otpValue = watch('otp')

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
        <DialogContent>
          <TypedField
            control={control}
            customRenderer
            component={OTPField}
            name='otp'
            label='Please enter your OTP from authenticator before proceeding'
            variant='outlined'
            valueExtractor={plainValueExtractor}
            shouldAutoFocus
          />
        </DialogContent>
        <VSpacer size='small' />
        <DialogActions>
          <Grid container spacing={2} justify='center'>
            <Grid item>
              <Button variant='outlined' color='primary' onClick={close}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disableElevation
                disabled={
                  otpValue === undefined ||
                  otpValue === null ||
                  otpValue === '' ||
                  otpValue.length < 6 ||
                  formState.isSubmitting
                }
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
