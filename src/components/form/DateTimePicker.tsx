import React from 'react'
import { InputAdornment, TextField } from '@material-ui/core'
import { DateRange as DateIcon } from '@material-ui/icons'
import { DateTimePicker, DateTimePickerProps } from '@material-ui/pickers'

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

export const DateTimePickerComponent = (props: DateTimePickerProps) => {
  const { margin = 'normal', ...rest } = props
  return (
    <DateTimePicker
      {...rest}
      autoOk
      variant='inline'
      inputVariant='outlined'
      margin={margin}
      TextFieldComponent={TextFieldComponent}
      format='MM/dd/yyyy HH:mm'
    />
  )
}
