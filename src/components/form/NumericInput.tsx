import React from 'react'
import { InputProps, TextField } from '@mui/material'
import NumberFormat, { NumberFormatProps } from 'react-number-format'

const InputComponent: React.FC = (props: NumberFormatProps<any>) => {
  const { onValueChange, onChange, inputRef, ...rest } = props
  return (
    <NumberFormat
      {...rest}
      customInput={TextField}
      onValueChange={onValueChange}
    />
  )
}

export interface NumericInputProps {
  numberFormat: NumberFormatProps<any>
  onChange?: any
  variant?: 'outlined' | 'standard'
}

export const NumericInput = (
  props: NumericInputProps & InputProps
): JSX.Element => {
  const { numberFormat, variant, ...rest } = props

  return (
    <InputComponent
      {...numberFormat}
      {...rest}
      // @ts-expect-error-next-line
      onValueChange={rest.onChange}
    />
  )
}
