import MobileDateTimePicker, {
  MobileDateTimePickerProps
} from '@mui/lab/MobileDateTimePicker'
import { Box, FormHelperText } from '@mui/material'
import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg'
import { useFormError } from 'hooks/useFormError'
import React from 'react'
import { TextInput } from 'ui/TextInput/TextInput'

export const DateTimePickerComponent = (props: MobileDateTimePickerProps) => {
  return (
    <MobileDateTimePicker
      inputFormat='MM/dd/yy hh:mm'
      {...props}
      renderInput={inputProps => (
        <Box position='relative'>
          <TextInput
            variant='outlined'
            fullWidth
            placeholder='mm/dd/yyyy'
            label='Date'
            {...inputProps}
          />
          <Box
            position='absolute'
            right={20}
            top={'50%'}
            style={{ pointerEvents: 'none' }}
          >
            <CalendarIcon />
          </Box>
        </Box>
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
