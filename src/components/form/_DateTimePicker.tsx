import React from 'react'
import MUIDateTimePicker, {
  DateTimePickerProps as MUIDateTimePickerProps
} from '@mui/lab/DateTimePicker'
import { FormHelperText, TextField } from '@mui/material'
import { useFormError } from 'hooks/useFormError'

export const DateTimePickerComponent = (props: MUIDateTimePickerProps) => {
  return (
    <MUIDateTimePicker
      {...props}
      renderInput={inputProps => (
        <TextField variant='outlined' fullWidth label='Date' {...inputProps} />
      )}
    />
  )
}

export interface DateTimePickerProps extends MUIDateTimePickerProps {
  name: string
}

export const DateTimePicker = (props: DateTimePickerProps) => {
  const { name } = props
  const { hasError, error } = useFormError(name ?? '')

  return (
    <>
      <DateTimePickerComponent {...props} />
      {hasError && <FormHelperText error>{error?.message}</FormHelperText>}
    </>
  )
}
