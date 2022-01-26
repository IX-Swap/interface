import React from 'react'
import MUIDatePicker, {
  DatePickerProps as MUIDatePickerProps
} from '@mui/lab/DatePicker'
import { FormHelperText, TextField } from '@mui/material'
import { useFormError } from 'hooks/useFormError'

export interface DatePickerProps extends MUIDatePickerProps {
  name: string
}

export const DatePicker = (props: DatePickerProps) => {
  const { name } = props
  const { hasError, error } = useFormError(name ?? '')
  const value =
    props.value === null || props.value === undefined ? null : props.value

  return (
    <>
      <MUIDatePicker
        {...props}
        value={value}
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
      {hasError && <FormHelperText error>{error?.message}</FormHelperText>}
    </>
  )
}
