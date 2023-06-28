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
import { TextInput } from 'ui/TextInput/TextInput'
import { DateTimeComponent } from './_DateTimePickerComponent'
import { DateRange as CalendarIcon } from '@mui/icons-material'

export const DateTimePickerComponent = (
  props: MobileDateTimePickerProps & { error: boolean; placeholder: string }
) => {
  return (
    <MobileDateTimePicker
      {...props}
      // Setting to null so the red outline error is not shown on first load
      value={props.value === '' ? null : props.value}
      renderInput={inputProps => (
        <TextInput
          variant='outlined'
          fullWidth
          placeholder={props?.placeholder ?? 'mm/dd/yyyy'}
          label='Date'
          {...inputProps}
          // Override error from inputProps to show red outline error
          error={props.error}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <CalendarIcon color='disabled' />
              </InputAdornment>
            )
          }}
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
}: DateTimePickerProps & { error: boolean }) => {
  const { name } = props
  const { hasError, error } = useFormError(name ?? '')
  const PickerComponent = withIcon ? DateTimePickerComponent : DateTimeComponent
  return (
    <>
      <PickerComponent
        {...props}
        components={{
          OpenPickerIcon: CalendarTodayOutlinedIcon
        }}
      />

      {props?.name === 'launchDate' && props?.disabled === true
        ? ''
        : hasError && <FormHelperText error>{error?.message}</FormHelperText>}
    </>
  )
}
