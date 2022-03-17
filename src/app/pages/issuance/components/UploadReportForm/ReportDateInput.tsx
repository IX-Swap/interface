import { Grid, Typography } from '@material-ui/core'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { TypedField } from 'components/form/TypedField'
import { dateTimeValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { subDays } from 'date-fns'

export const ReportDateInput = () => {
  const { control, watch } = useFormContext()
  const fromValue = watch('dateFrom')
  const yesterday = subDays(new Date(), 1)

  return (
    <Grid container spacing={2} wrap='nowrap' alignItems='center'>
      <Grid item>
        <Typography variant='subtitle2' noWrap>
          Reporting Date*:
        </Typography>
      </Grid>
      <Grid item>
        <TypedField
          component={DateTimePicker}
          customRenderer
          label='From'
          name='dateFrom'
          control={control}
          valueExtractor={dateTimeValueExtractor}
          defaultValue={null}
          // @ts-expect-error-next-line
          inputVariant='outlined'
          inputFormat='MM/dd/yyyy'
          maxDate={yesterday}
        />
      </Grid>
      <Grid item>
        <TypedField
          component={DateTimePicker}
          customRenderer
          label='To'
          name='dateTo'
          control={control}
          valueExtractor={dateTimeValueExtractor}
          defaultValue={null}
          // @ts-expect-error-next-line
          inputVariant='outlined'
          inputFormat='MM/dd/yyyy'
          minDate={fromValue}
          maxDate={new Date()}
        />
      </Grid>
    </Grid>
  )
}
