import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import DesktopDateTimePicker, {
  DesktopDateTimePickerProps
} from '@mui/lab/DesktopDateTimePicker'
import MobileDateTimePicker, {
  MobileDateTimePickerProps
} from '@mui/lab/MobileDateTimePicker'
import { FormHelperText, InputAdornment } from '@mui/material'
import { useFormError } from 'hooks/useFormError'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'
import { TextInput } from 'ui/TextInput/TextInput'
import { DateTimeComponent } from './_DateTimePickerComponent'

export const DateTimePickerComponent = (props: MobileDateTimePickerProps) => {
  return (
    <MobileDateTimePicker
      inputFormat='MM/DD/YYYY'
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <Icon noHover name='date' />
          </InputAdornment>
        )
      }}
      renderInput={inputProps => (
        <TextInput
          variant='outlined'
          fullWidth
          placeholder='mm/dd/yyyy'
          label='Date'
          hideIcon={false}
          InputProps={{
            endAdornment: <InputAdornment position='end'>XXX</InputAdornment>
          }}
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
      inputFormat='MM/DD/YYYY'
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
  const PickerComponent = !withIcon
    ? DateTimeComponent
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
