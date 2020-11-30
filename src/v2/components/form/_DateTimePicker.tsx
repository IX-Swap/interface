import React from 'react'
import {
  KeyboardDateTimePicker,
  KeyboardDateTimePickerProps,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { useFormError } from 'v2/hooks/useFormError'
import { FormHelperText } from '@material-ui/core'

export const DateTimePickerComponent = (props: KeyboardDateTimePickerProps) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        {...props}
        disableToolbar
        variant='dialog'
        format='MM/dd/yyyy HH:mm'
        placeholder='mm/dd/yy hh:mm'
        margin='none'
        fullWidth
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export interface DateTimePickerProps extends KeyboardDateTimePickerProps {}

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
