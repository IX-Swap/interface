import React, { ReactNode } from 'react'
import { Typography, Grid, FormHelperText } from '@mui/material'
import { OTPInputField } from 'components/form/OTPInputField'
import { ErrorMessage } from '@hookform/error-message'
import { hasValue } from 'helpers/forms'

export interface OTPFieldProps {
  value?: any
  error?: boolean
  label?: string | ReactNode
  hasHelperText?: boolean
  helperText?: string
  onChange?: any
  control?: any
  path?: any
  variant?: 'standard' | 'outlined'
  numInputs?: number
  isInputNum?: boolean
  shouldAutoFocus?: boolean
  placeholder?: string
}

export const OTPField = ({
  value,
  error = false,
  label,
  hasHelperText,
  helperText,
  onChange,
  control,
  path,
  variant = 'standard',
  numInputs = 6,
  shouldAutoFocus = false,
  isInputNum = false,
  placeholder
}: OTPFieldProps) => {
  const renderLabel = () =>
    typeof label === 'string' ? (
      <Typography
        data-testid='otp-field-label'
        component='p'
        align='center'
        variant='caption'
      >
        {label}
      </Typography>
    ) : (
      label
    )

  return (
    <Grid container direction='column' spacing={1}>
      {hasValue(label) ? <Grid item>{renderLabel()}</Grid> : null}
      <Grid item>
        <OTPInputField
          fullwidth
          name={path}
          control={control}
          hasErrored={error}
          value={value}
          onChange={onChange}
          numInputs={numInputs}
          isInputNum={isInputNum}
          variant={variant}
          shouldAutoFocus={shouldAutoFocus}
          placeholder={placeholder}
        />
      </Grid>
      {!error && hasHelperText && (
        <Grid item>
          <FormHelperText>{helperText}</FormHelperText>
        </Grid>
      )}
      {error ? (
        <Grid item>
          <ErrorMessage
            errors={control.formStateRef.current.errors}
            name={path}
            render={({ message }) => (
              <FormHelperText error>{message}</FormHelperText>
            )}
          />
        </Grid>
      ) : null}
    </Grid>
  )
}
