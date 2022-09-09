import React from 'react'
import DesktopDateTimePicker, {
  DesktopDateTimePickerProps
} from '@mui/lab/DesktopDateTimePicker'
import MobileDateTimePicker, {
  MobileDateTimePickerProps
} from '@mui/lab/MobileDateTimePicker'
import { FormHelperText } from '@mui/material'
import { useFormError } from 'hooks/useFormError'
import { TextInput } from 'ui/TextInput/TextInput'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'

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

export const DesktopDateTimePickerComponent = (
  props: DesktopDateTimePickerProps
) => {
  return (
    <DesktopDateTimePicker
      inputFormat='MM/dd/yy    hh:mm a'
      InputAdornmentProps={{ style: { paddingRight: 8.5 } }}
      {...props}
      renderInput={inputProps => (
        <TextInput variant='outlined' fullWidth label='Date' {...inputProps} />
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
