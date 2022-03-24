import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { dateTimeValueExtractor } from 'helpers/forms'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DatePicker as NewDatePicker } from 'ui/DateTimePicker/DatePicker'

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
        defaultValue={new Date()}
        minDate={new Date()}
      />
    </LocalizationProvider>
  )
}
