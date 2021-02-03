import { useStyles } from 'components/form/OTPInputField.styles'
import React from 'react'
import OtpInput, { OtpInputProps } from 'react-otp-input'

export interface OTPInputFieldArgs extends OtpInputProps {
  variant?: 'standard' | 'outlined'
  fullwidth?: boolean
}

export const OTPInputField = ({
  variant = 'standard',
  fullwidth = false,
  shouldAutoFocus = false,
  ...rest
}: OTPInputFieldArgs) => {
  const classes = useStyles()

  return (
    <OtpInput
      errorStyle={classes.error}
      containerStyle={`${classes.container} ${
        fullwidth ? classes.fullwidth : ''
      }`}
      inputStyle={`${classes.base} ${classes[variant]}`}
      shouldAutoFocus={shouldAutoFocus}
      {...rest}
    />
  )
}
