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
  value,
  onChange: setDate,
  name
}: DatePickerProps) => {
  const [view, setView] = useState<'day' | 'month' | 'year'>('day')

  const date: Date | undefined = value instanceof Date ? value : new Date()
  const _minDate: Date | undefined =
    minDate instanceof Date ? minDate : undefined
  const _maxDate: Date | undefined =
    maxDate instanceof Date ? maxDate : undefined

  const getDateValue = (value: unknown) => {
    if (!(value instanceof Date)) {
      return undefined
    }
    let date = value
    if (_minDate !== undefined && value < _minDate) {
      date = _minDate
    }
    if (_maxDate !== undefined && value > _maxDate) {
      date = _maxDate
    }

    return date
  }

  const onChange: PickerOnChangeFn<unknown> = value => {
    setDate(getDateValue(value))
    setView('day')
  }

  const resetViews = () => {
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
            date={date}
            setDate={onChange}
            open={view === 'month'}
            onClick={setViewToMonth}
            minDate={_minDate}
            maxDate={_maxDate}
            el={CustomMonthPicker}
            label={format(date, 'MMMM')}
            clickAwayHandler={resetViews}
          />
          <PickerButton
            date={date}
            setDate={onChange}
            open={view === 'year'}
            onClick={setViewToYear}
            minDate={_minDate}
            maxDate={_maxDate}
            el={CustomYearPicker}
            label={format(date, 'yyyy')}
            isDateDisabled={() => false}
            placement='bottom-end'
            clickAwayHandler={resetViews}
          />
        </Box>
        <Box position='relative' width='100%'>
          <CustomCalendarPicker
            date={date}
            onChange={onChange}
            view='day'
            views={['day']}
            minDate={_minDate}
            maxDate={_maxDate}
          />
        </Box>
      </Box>
    </Box>
  )
}
