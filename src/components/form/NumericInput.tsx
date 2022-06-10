import React from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'
import { InputProps, TextInput } from 'ui/TextInput/TextInput'

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

NumericInput.displayName = 'TextField_NumericInput'
