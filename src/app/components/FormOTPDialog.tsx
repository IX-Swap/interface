import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  Button,
  ButtonProps,
  DialogActions,
  DialogContent,
  Grid,
  Typography
} from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { OTPField } from 'components/form/OTPField'
import { plainValueExtractor } from 'helpers/forms'
import { VSpacer } from 'components/VSpacer'
import { Submit } from 'components/form/Submit'
import { CenteredDialogTitle } from 'ui/CenteredDialogTitle'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export interface FormOTPDialogProps {
  triggerButtonProps: ButtonProps
}

export const FormOTPDialog = (props: FormOTPDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  const { control, watch, formState } = useFormContext()
  const otpValue = watch('otp')
  const isSubmitDisabled =
    otpValue === undefined ||
    otpValue === null ||
    otpValue === '' ||
    otpValue.length < 6 ||
    formState.isSubmitting
  const isTriggerDisabled =
    !formState.isDirty || props.triggerButtonProps.disabled

  return (
    <>
      <Button
        onClick={openDialog}
        children='Submit'
        {...props.triggerButtonProps}
        disabled={isTriggerDisabled}
      />
      <UIDialog disablePortal open={isOpen} maxWidth='md' onClose={closeDialog}>
        <CenteredDialogTitle>Please Enter Your 2FA</CenteredDialogTitle>
        <DialogContent>
          <TypedField
            control={control}
            customRenderer
            component={OTPField}
            name='otp'
            label={
              <Typography variant='subtitle1' component='p'>
                Please enter your OTP from authenticator before proceeding
              </Typography>
            }
            variant='outlined'
            valueExtractor={plainValueExtractor}
            shouldAutoFocus
          />
        </DialogContent>
        <VSpacer size='small' />
        <DialogActions>
          <Grid container spacing={2} justifyContent='center'>
            <Grid item>
              <Button variant='outlined' color='primary' onClick={closeDialog}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Submit
                variant='contained'
                color='primary'
                disabled={isSubmitDisabled}
                onClick={closeDialog}
                disableElevation
              >
                Confirm
              </Submit>
            </Grid>
          </Grid>
        </DialogActions>
        <VSpacer size='medium' />
      </UIDialog>
    </>
  )
}

FormOTPDialog.defaultProps = {
  triggerButtonProps: {}
}
