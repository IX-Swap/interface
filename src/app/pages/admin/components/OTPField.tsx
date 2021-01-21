import React, { ChangeEvent } from 'react'
import { Typography, TextField, Box } from '@material-ui/core'
import { hasValue } from 'helpers/forms'

export interface OTPFieldProps {
  otp: string
  setOtp: (otp: string) => void
  errorMessage?: string
}
export const OTPField = ({ otp, setOtp, errorMessage }: OTPFieldProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value ?? '')
  }
  return (
    <>
      <Typography component='p' align='center' variant='caption'>
        Please enter your OTP from Google Authenticator before proceeding
      </Typography>
      <Box p={1} />
      <TextField
        error={hasValue(errorMessage)}
        helperText={errorMessage}
        onChange={handleChange}
        value={otp}
        variant='outlined'
        label='OTP'
        fullWidth
        data-testid='otp-field'
      />
    </>
  )
}
