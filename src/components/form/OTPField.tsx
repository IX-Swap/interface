import React, { ReactNode } from 'react'
import { Typography, Grid, FormHelperText } from '@material-ui/core'
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
  isInputNum = false
}: OTPFieldProps) => {
  return (
    <Grid container direction='column' spacing={1}>
      {hasValue(label) ? (
        <Grid item>
          {typeof label === 'string' ? (
            <Typography component='p' align='center' variant='caption'>
              {label}
            </Typography>
          ) : (
            label
          )}
        </Grid>
      ) : null}
      <Grid item>
        <OTPInputField
          fullwidth
          hasErrored={error}
          value={value}
          onChange={onChange}
          numInputs={numInputs}
          isInputNum={isInputNum}
          variant={variant}
          shouldAutoFocus={shouldAutoFocus}
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
