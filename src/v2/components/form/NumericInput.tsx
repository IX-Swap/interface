import { Input, InputProps } from '@material-ui/core'
import React from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'

const InputComponent: React.FC = (props: NumberFormatProps) => {
  const { onValueChange, onChange, ...rest } = props
  return <NumberFormat {...rest} onValueChange={onValueChange} />
}

export interface NumericInputProps {
  numberFormat: NumberFormatProps
  onChange?: any
}

export const NumericInput = (
  props: NumericInputProps & InputProps
): JSX.Element => {
  const { numberFormat, ...rest } = props

  return (
    <Input
      {...rest}
      inputComponent={InputComponent}
      inputProps={{
        ...numberFormat,
        onValueChange: rest.onChange
      }}
    />
  )
}
