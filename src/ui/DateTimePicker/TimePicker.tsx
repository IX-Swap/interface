import { Box, Typography } from '@mui/material'
import { format, setHours, setMinutes } from 'date-fns'
import { isString } from 'lodash'
import React from 'react'
import { TimePickerValue } from 'react-time-picker'
import { CustomTimePicker } from 'ui/DateTimePicker/CustomTimePicker'
import { PickerButton } from 'ui/DateTimePicker/PickerButton'
import { TimePickerWrapper } from 'ui/DateTimePicker/TimePickerWrapper'
import { AmPm } from 'ui/DateTimePicker/AmPm'

export interface TimePickerProps {
  onChange: (value: unknown) => void
  value: Date
  view: 'day' | 'year' | 'month' | 'ampm'
  openAmPm: () => void
  resetViews: () => void
}

export const TimePicker = ({
  onChange,
  value: dateValue,
  view,
  openAmPm,
  resetViews
}: TimePickerProps) => {
  const handleChange = (pickerValue: TimePickerValue) => {
    if (isString(pickerValue)) {
      const hour = pickerValue.split(':')[0]
      const minutes = pickerValue.split(':')[1]
      let datetime = setHours(dateValue, parseInt(hour))
      datetime = setMinutes(datetime, parseInt(minutes))
      onChange(datetime)
    }

    if (pickerValue instanceof Date) {
      onChange(pickerValue)
    }
  }
  return (
    <Box>
      <Typography
        sx={{
          mb: 1
        }}
        variant='subtitle1'
      >
        Time
      </Typography>
      <TimePickerWrapper>
        <CustomTimePicker
          onChange={handleChange}
          value={dateValue}
          disableClock
          clearIcon={null}
          format='hh : mm'
        />
        <PickerButton
          date={dateValue}
          setDate={onChange}
          open={view === 'ampm'}
          onClick={openAmPm}
          el={AmPm}
          label={format(new Date(dateValue), 'a')}
          isDateDisabled={() => false}
          placement='bottom-end'
          clickAwayHandler={resetViews}
        />
      </TimePickerWrapper>
    </Box>
  )
}
