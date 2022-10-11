import React from 'react'
import { DateTimePicker, DateTimePickerProps } from '@mui/lab'
import { TextInput } from 'ui/TextInput/TextInput'

export const DateTimeComponent = (props: DateTimePickerProps) => {
  return (
    <DateTimePicker
      inputFormat='MM/dd/yyyy'
      InputAdornmentProps={{ style: { paddingRight: 8.5 } }}
      {...props}
      renderInput={inputProps => (
        <TextInput variant='outlined' fullWidth label='Date' {...inputProps} />
      )}
    />
  )
}
