import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import DesktopDateTimePicker, {
  DesktopDateTimePickerProps
} from '@mui/lab/DesktopDateTimePicker'
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

export const DesktopDateTimePickerComponent = (
  props: DesktopDateTimePickerProps
) => {
  return (
    <DesktopDateTimePicker
      inputFormat='MM/dd/yy hh:mm a'
      InputAdornmentProps={{ style: { paddingRight: 8.5 } }}
      {...props}
      renderInput={inputProps => (
        <Box position='relative'>
          <TextInput
            variant='outlined'
            fullWidth
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

export interface DateTimePickerProps
  extends DesktopDateTimePickerProps,
    MobileDateTimePickerProps {
  name: string
  withIcon?: boolean
}

export const DateTimePicker = ({
  withIcon = false,
  ...props
}: DateTimePickerProps) => {
  const { name } = props
  const { hasError, error } = useFormError(name ?? '')
  const PickerComponent = withIcon
    ? DesktopDateTimePickerComponent
    : DateTimePickerComponent

  return (
    <>
      <PickerComponent
        {...props}
        components={{
          OpenPickerIcon: CalendarTodayOutlinedIcon
        }}
      />
      {hasError && <FormHelperText error>{error?.message}</FormHelperText>}
    </>
  )
}
