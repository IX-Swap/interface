import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { dateTimeValueExtractor } from 'helpers/forms'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DatePicker as NewDatePicker } from 'ui/DateTimePicker/DatePicker'
import { addDays } from 'date-fns'

export const DatepickerFields = () => {
  const { control } = useFormContext()
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TypedField
        control={control}
        name='date'
        label='Date'
        component={NewDatePicker}
        customRenderer
        valueExtractor={dateTimeValueExtractor}
        defaultValue={addDays(new Date(), 8)}
        minDate={new Date()}
      />
    </LocalizationProvider>
  )
}
