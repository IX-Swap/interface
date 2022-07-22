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
  size?: 'small' | 'medium'
}

export const OTPInputField = ({
  variant = 'standard',
  fullwidth = false,
  shouldAutoFocus = false,
  size = 'medium',
  ...rest
}: OTPInputFieldProps) => {
  const classes = useStyles()
  const placeholder = '______'

  return (
    <OtpInput
      errorStyle={classes.error}
      containerStyle={classnames(classes.container, {
        [classes.fullwidth]: fullwidth
      })}
      inputStyle={classnames(classes.input, {
        [classes.small]: size === 'small'
      })}
      shouldAutoFocus={shouldAutoFocus}
      placeholder={placeholder}
      {...rest}
    />
  )
}
