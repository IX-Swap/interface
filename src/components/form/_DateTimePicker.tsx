import React from 'react'
import MobileDateTimePicker, {
  MobileDateTimePickerProps
} from '@mui/lab/MobileDateTimePicker'
import { FormHelperText } from '@mui/material'
import { useFormError } from 'hooks/useFormError'
import { TextInput } from 'ui/TextInput/TextInput'

export const DateTimePickerComponent = (props: MobileDateTimePickerProps) => {
  return (
    <MobileDateTimePicker
      inputFormat='MM/dd/yy hh:mm'
      {...props}
      renderInput={inputProps => (
        <TextInput variant='outlined' fullWidth label='Date' {...inputProps} />
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
