import { Grid, Typography } from '@mui/material'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { TypedField } from 'components/form/TypedField'
import { dateTimeValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const ReportDateInput = () => {
  const { control, watch } = useFormContext()
  const fromValue = watch('dateFrom')
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
        />
      </Grid>
    </Grid>
  )
}
