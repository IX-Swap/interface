import React from 'react'
import MobileDateTimePicker, {
  MobileDateTimePickerProps
} from '@mui/lab/MobileDateTimePicker'
import { FormHelperText, TextField } from '@mui/material'
import { useFormError } from 'hooks/useFormError'

export const DateTimePickerComponent = (props: MobileDateTimePickerProps) => {
  return (
    <MobileDateTimePicker
      inputFormat='MM/dd/yy'
      {...props}
      renderInput={inputProps => (
        <TextField variant='outlined' fullWidth label='Date' {...inputProps} />
      )}
    />
  )
}

export interface DateTimePickerProps extends MobileDateTimePickerProps {
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
