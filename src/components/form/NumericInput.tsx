import React from 'react'
import { Input, InputProps, OutlinedInput } from '@material-ui/core'
import NumberFormat, { NumberFormatProps } from 'react-number-format'

const InputComponent: React.FC = (props: NumberFormatProps<any>) => {
  const { onValueChange, onChange, inputRef, ...rest } = props
  return <NumberFormat {...rest} onValueChange={onValueChange} />
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

  return variant === undefined || variant === 'standard' ? (
    <Input
      {...rest}
      inputComponent={InputComponent}
      inputProps={{
        ...numberFormat,
        onValueChange: rest.onChange
      }}
    />
  ) : (
    <OutlinedInput
      {...rest}
      inputComponent={InputComponent}
      inputProps={{
        ...numberFormat,
        onValueChange: rest.onChange
      }}
    />
  )
}
