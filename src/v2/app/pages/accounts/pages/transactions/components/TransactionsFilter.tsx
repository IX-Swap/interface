import React from 'react'
import { Grid } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'v2/components/form/TypedField'
import { dateTimeValueExtractor } from 'v2/helpers/forms'
import { AssetSelect } from 'v2/components/form/AssetSelect'
import { DatePicker } from 'v2/components/form/DatePicker'

export const TransactionsFilter = () => {
  const { control } = useFormContext()

  return (
    <Grid container justify='space-between'>
      <Grid item container direction='row' xs={9} spacing={2}>
        <Grid item>
          {/* @ts-ignore */}
          <TypedField
            control={control}
            component={DatePicker}
            customRenderer
            valueExtractor={dateTimeValueExtractor}
            name='from'
            label='From'
          />
        </Grid>
        <Grid item>
          {/* @ts-ignore */}
          <TypedField
            control={control}
            component={DatePicker}
            customRenderer
            valueExtractor={dateTimeValueExtractor}
            name='to'
            label='To'
          />
        </Grid>
      </Grid>
      <Grid item xs={3} justify='flex-end' container>
        <TypedField
          control={control}
          component={AssetSelect}
          name='asset'
          label='Asset'
          assetType='Currency'
        />
      </Grid>
    </Grid>
  )
}
