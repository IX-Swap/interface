import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import DesktopDateTimePicker, {
  DesktopDateTimePickerProps
} from '@mui/lab/DesktopDateTimePicker'
import MobileDateTimePicker, {
  MobileDateTimePickerProps
} from '@mui/lab/MobileDateTimePicker'
import { FormHelperText } from '@mui/material'
import { useFormError } from 'hooks/useFormError'
import React from 'react'
import { TextInput } from 'ui/TextInput/TextInput'

export const DateTimePickerComponent = (props: MobileDateTimePickerProps) => {
  return (
    <MobileDateTimePicker
      inputFormat='mm/dd/yyyy'
      {...props}
      renderInput={inputProps => (
        <TextInput
          variant='outlined'
          fullWidth
          placeholder='mm/dd/yyyy'
          label='Date'
          {...inputProps}
        />
      )}
    />
  )
}

export const DesktopDateTimePickerComponent = (
  props: DesktopDateTimePickerProps
) => {
  return (
    <DesktopDateTimePicker
      inputFormat='mm/dd/yyyy'
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
