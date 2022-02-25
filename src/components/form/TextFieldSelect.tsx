import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'
export const TextFieldSelect = (props: TextFieldProps) => {
  const { label, children, onChange, value } = props
  return (
    <TextField
      select
      id={`${label as string}-select-input`}
      SelectProps={{
        displayEmpty: true,
        labelId: `${label as string}-select-label`
      }}
      InputLabelProps={{ shrink: true }}
      onChange={onChange}
      value={value ?? ''}
      label={label}
    >
      {children}
    </TextField>
  )
}
