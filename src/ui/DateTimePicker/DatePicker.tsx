import React, { useState } from 'react'
import { Box, TextField } from '@mui/material'
import { CustomCalendarPicker } from 'ui/DateTimePicker/CustomDatePicker'
import { CustomYearPicker } from 'ui/DateTimePicker/CustomYearPicker'
import { PickerOnChangeFn } from '@mui/lab/internal/pickers/hooks/useViews'
import { PickerButton } from 'ui/DateTimePicker/PickerButton'
import { addYears, format, subYears } from 'date-fns'
import { DatePickerProps as MUIDatePickerProps } from '@mui/lab/DatePicker'
import { CustomMonthPicker } from 'ui/DateTimePicker/CustomMonthPicker'

const defaultDates = {
  min: subYears(new Date(), 40),
  max: addYears(new Date(), 40)
}

export interface DatePickerProps
  extends Omit<MUIDatePickerProps, 'renderInput'> {
  name: string
}

export const DatePicker = ({
  minDate = defaultDates.min,
  maxDate = defaultDates.max,
  value: date = new Date(),
  onChange: setDate,
  name
}: DatePickerProps) => {
  const [view, setView] = useState<'day' | 'month' | 'year'>('day')

  const onChange: PickerOnChangeFn<Date> = value => {
    setDate(value as Date)
    setView('day')
  }

  const setViewToMonth = () => {
    setView('month')
  }

  const setViewToYear = () => {
    setView('year')
  }

  return (
    <Box>
      <TextField value={date} name={name} />
      <Box maxWidth={320}>
        <Box display='flex' justifyContent='space-between'>
          <PickerButton
            date={date as Date}
            setDate={onChange}
            open={view === 'month'}
            onClick={setViewToMonth}
            minDate={minDate as Date}
            maxDate={maxDate as Date}
            el={CustomMonthPicker}
            label={format(date as Date, 'MMMM')}
          />
          <PickerButton
            date={date as Date}
            setDate={onChange}
            open={view === 'year'}
            onClick={setViewToYear}
            minDate={minDate as Date}
            maxDate={maxDate as Date}
            el={CustomYearPicker}
            label={format(date as Date, 'yyyy')}
            isDateDisabled={() => false}
          />
        </Box>
        <Box position='relative' width='100%'>
          <CustomCalendarPicker
            date={date}
            onChange={onChange as any}
            view='day'
            views={['day']}
          />
        </Box>
      </Box>
    </Box>
  )
}
