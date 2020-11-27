import React from 'react'
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { useFormError } from 'v2/hooks/useFormError'
import { FormHelperText } from '@material-ui/core'

export interface DatePickerProps extends KeyboardDatePickerProps {}

export const DatePicker = (props: DatePickerProps) => {
  const { name } = props
  const { hasError, error } = useFormError(name ?? '')
  const value =
    props.value === null || props.value === undefined ? null : props.value

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        {...props}
        value={value}
        disableToolbar
        variant='dialog'
        format='MM/dd/yyyy'
        placeholder='mm/dd/yy'
        margin='none'
        fullWidth
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
      {hasError && <FormHelperText error>{error?.message}</FormHelperText>}
    </MuiPickersUtilsProvider>
  )
}
