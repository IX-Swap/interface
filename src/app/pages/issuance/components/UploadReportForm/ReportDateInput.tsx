import { Grid, Typography } from '@material-ui/core'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { TypedField } from 'components/form/TypedField'
import { dateTimeValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const ReportDateInput = () => {
  const { control, watch } = useFormContext()
  const fromValue = watch('from')
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
          name='from'
          control={control}
          valueExtractor={dateTimeValueExtractor}
          defaultValue={null}
          inputVariant='outlined'
        />
      </Grid>
      <Grid item>
        <TypedField
          component={DateTimePicker}
          customRenderer
          label='To'
          name='to'
          control={control}
          valueExtractor={dateTimeValueExtractor}
          defaultValue={null}
          inputVariant='outlined'
          minDate={fromValue}
        />
      </Grid>
    </Grid>
  )
}
