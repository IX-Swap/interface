import React from 'react'
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

export interface DatePickerProps extends KeyboardDatePickerProps {}

export const DatePicker = (props: DatePickerProps) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        {...props}
        disableToolbar
        variant='dialog'
        format='MM/dd/yyyy'
        placeholder='mm/dd/yy'
        margin='none'
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
    </MuiPickersUtilsProvider>
  )
}
