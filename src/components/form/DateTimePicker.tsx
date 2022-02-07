import React from 'react'
import { InputAdornment, TextField } from '@mui/material'
import { DateRange as DateIcon } from '@mui/icons-material'
import MUIDateTimePicker, {
  DateTimePickerProps as MUIDateTimePickerProps
} from '@mui/lab/DateTimePicker'

const TextFieldComponent: React.FC = (props: any) => (
  <TextField
    {...props}
    fullWidth
    size='small'
    InputProps={{
      endAdornment: (
        <InputAdornment position='end' style={{ color: '#AAAAAA' }}>
          <DateIcon />
        </InputAdornment>
      )
    }}
  />
)

export const DateTimePickerComponent = (props: MUIDateTimePickerProps) => {
  return (
    <MUIDateTimePicker
      {...props}
      renderInput={inputProps => (
        <TextFieldComponent label='Date' {...inputProps} />
      )}
    />
  )
}
