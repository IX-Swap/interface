import React from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'
import { TextInput } from 'ui/TextInput/TextInput'
import { InputProps } from '@mui/material'

const InputComponent: React.FC = (props: NumberFormatProps<any>) => {
  const { onValueChange, onChange, inputRef, ...rest } = props
  return (
    <NumberFormat
      {...rest}
      customInput={TextInput}
      onValueChange={onValueChange}
    />
  )
}

export interface NumericInputProps {
  hideIcon?: boolean
  numberFormat: NumberFormatProps<any>
  onChange?: any
  variant?: 'outlined' | 'standard'
}

export interface NumericInputAdornmentProps extends NumericInputProps {
  InputProps?: {
    startAdornment: JSX.Element
    endAdornment: JSX.Element
  }
  isAllowed?: (values: any) => boolean | boolean
}

export const NumericInput = (
  props: NumericInputAdornmentProps & InputProps
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

NumericInput.displayName = 'TextField_NumericInput'
