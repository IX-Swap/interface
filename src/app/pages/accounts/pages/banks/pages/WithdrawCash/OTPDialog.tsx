import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Box,
  Typography
} from '@mui/material'
import { WithdrawCashFormValues } from 'app/pages/accounts/types'
import { OTPField } from 'components/form/OTPField'
import { TypedField } from 'components/form/TypedField'
import { VSpacer } from 'components/VSpacer'
import { plainValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { useTheme } from '@mui/material/styles'

export const OTPDialogContent = ({
  close,
  content,
  actionLabel
}: Pick<OTPDialogProps, 'close' | 'content' | 'actionLabel'>) => {
  const { control, watch, formState } = useFormContext<WithdrawCashFormValues>()
  const otpValue = watch('otp')
  const theme = useTheme()

  return (
    <>
      <DialogContent>
        {content !== undefined ? <>{content}</> : null}
        <TypedField
          control={control}
          customRenderer
          component={OTPField}
          name='otp'
          label={
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start'
              }}
            >
              <Typography color={theme.palette.dialog.color}>OTP</Typography>
              <Typography color={theme.palette.text.secondary}>
                (Enter code from authenticator to proceed)
              </Typography>
            </Box>
          }
          variant='outlined'
          valueExtractor={plainValueExtractor}
          shouldAutoFocus
          placeholder='______'
        />
      </DialogContent>
      <VSpacer size='small' />
      <DialogActions>
        <Grid container spacing={2} justifyContent='center'>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant='outlined'
              color='primary'
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
    <UIDialog disablePortal open={open} maxWidth='sm' onClose={close}>
      <DialogTitle>
        <Box textAlign='center'>{title ?? 'Cash Withdrawal'}</Box>
      </DialogTitle>
      <OTPDialogContent {...props} />
    </UIDialog>
  )
}
