import { useStyles } from './OTPInputField.styles'
import React from 'react'
import OtpInput, { OtpInputProps } from 'react-otp-input'
import { Control } from 'react-hook-form'
import classnames from 'classnames'

export interface OTPInputFieldProps extends OtpInputProps {
  variant?: 'standard' | 'outlined'
  fullwidth?: boolean
  name?: string
  control?: Control
  mobile?: boolean
}

export const OTPInputField = ({
  variant = 'standard',
  fullwidth = false,
  shouldAutoFocus = false,
  mobile = false,
  ...rest
}: OTPInputFieldProps) => {
  const classes = useStyles({ mobile })
  const placeholder = '______'

  return (
    <OtpInput
      errorStyle={classes.error}
      containerStyle={classnames(classes.container, {
        [classes.fullwidth]: fullwidth
      })}
      inputStyle={classes.input}
      shouldAutoFocus={shouldAutoFocus}
      placeholder={placeholder}
      {...rest}
    />
  )
}
