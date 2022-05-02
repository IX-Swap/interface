import { DateRange as DateIcon } from '@mui/icons-material'
import MUIDateTimePicker, {
  DateTimePickerProps as MUIDateTimePickerProps
} from '@mui/lab/DateTimePicker'
import { InputAdornment } from '@mui/material'
import React from 'react'
import { TextInput } from 'ui/TextInput/TextInput'

const TextFieldComponent: React.FC = (props: any) => (
  <TextInput
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
