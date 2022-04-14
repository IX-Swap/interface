import { TextFieldProps } from '@mui/material'
import React from 'react'
import { TextInput } from 'ui/TextInput/TextInput'
export const TextFieldSelect = (props: TextFieldProps) => {
  const { label, children, onChange, value } = props
  return (
    <TextInput
      select
      id={`${label as string}-select-input`}
      SelectProps={{
        displayEmpty: true,
        labelId: `${label as string}-select-label`
      }}
      onChange={onChange}
      value={value ?? ''}
      hideIcon
      label={label}
    >
      {children}
    </TextInput>
  )
}

TextFieldSelect.displayName = 'TextField_TextFieldSelect'
