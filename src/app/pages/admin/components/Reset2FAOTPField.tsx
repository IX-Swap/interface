import React from 'react'
import { Typography, Grid, FormHelperText } from '@mui/material'
import { OTPInputField } from 'components/form/OTPInputField'

export interface Reset2FAOTPFieldProps {
  otp: string
  setOtp: (otp: string) => void
  errorMessage?: string
}
export const Reset2FAOTPField = ({
  otp,
  setOtp,
  errorMessage
}: Reset2FAOTPFieldProps) => {
  const handleChange = (value: string) => {
    setOtp(value)
  }

  const hasError = errorMessage !== undefined

  return (
    <Grid container direction='column' spacing={1}>
      <Grid item>
        <Typography component='p' align='center' variant='caption'>
          Please enter your OTP from Google Authenticator before proceeding
        </Typography>
      </Grid>
      <Grid item>
        <OTPInputField
          fullwidth
          hasErrored={hasError}
          value={otp}
          onChange={handleChange}
          numInputs={6}
          variant='outlined'
          shouldAutoFocus
        />
      </Grid>
      {hasError ? (
        <Grid item>
          <FormHelperText error style={{ textAlign: 'center' }}>
            {errorMessage}
          </FormHelperText>
        </Grid>
      ) : null}
    </Grid>
  )
}
