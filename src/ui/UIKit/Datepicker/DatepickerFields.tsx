import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { dateTimeValueExtractor } from 'helpers/forms'
import { DatePicker as NewDatePicker } from 'ui/DateTimePicker/DatePicker'
import { addDays } from 'date-fns'
import { Grid } from '@mui/material'

export const DatepickerFields = () => {
  const { control } = useFormContext()
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <TypedField
          control={control}
          name='datetime'
          label='Date and Time'
          component={NewDatePicker}
          customRenderer
          valueExtractor={dateTimeValueExtractor}
          defaultValue={addDays(new Date(), 8)}
          variant='datetime'
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TypedField
          control={control}
          name='date'
          label='Date'
          component={NewDatePicker}
          customRenderer
          valueExtractor={dateTimeValueExtractor}
          defaultValue={addDays(new Date(), 8)}
          variant='date'
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TypedField
          control={control}
          name='time'
          label='Time'
          component={NewDatePicker}
          customRenderer
          valueExtractor={dateTimeValueExtractor}
          defaultValue={addDays(new Date(), 8)}
          variant='time'
        />
      </Grid>
    </Grid>
  )
}
