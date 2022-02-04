import React from 'react'
import MUIDatePicker, {
  DatePickerProps as MUIDatePickerProps
} from '@mui/lab/DatePicker'
import { FormHelperText, TextField } from '@mui/material'
import { useFormError } from 'hooks/useFormError'

export interface DatePickerProps
  extends Omit<MUIDatePickerProps, 'renderInput'> {
  name: string
}

export const DatePickerComponent = (props: DatePickerProps) => {
  return (
    <MUIDatePicker
      {...props}
      renderInput={inputProps => (
        <TextField
          fullWidth
          margin='none'
          variant='outlined'
          label='Date'
          {...inputProps}
        />
      )}
    />
  )
}

export const DatePicker = (props: DatePickerProps) => {
  const { name } = props
  const { hasError, error } = useFormError(name ?? '')
  const value =
    props.value === null || props.value === undefined ? null : props.value

  return (
    <>
      <DatePickerComponent {...props} name={name} value={value} />
      {hasError && <FormHelperText error>{error?.message}</FormHelperText>}
    </>
  )
}
