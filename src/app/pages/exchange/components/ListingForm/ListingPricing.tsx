import React from 'react'
import { moneyNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'
import { Grid } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { NumericInput } from 'components/form/NumericInput'
import { useFormContext } from 'react-hook-form'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

export const ListingPricing = () => {
  const { control } = useFormContext()

  return (
    <Grid item>
      <Grid container spacing={2} direction='column'>
        <Grid item>
          <FormSectionHeader title='Pricing' />
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TypedField
                control={control}
                component={NumericInput}
                label='Min Trade Amount'
                name='minimumTradeUnits'
                numberFormat={moneyNumberFormat}
                valueExtractor={numericValueExtractor}
                helperText='Minimum trading amount you expect user to trade'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TypedField
                control={control}
                component={NumericInput}
                label='Max Trade Amount'
                name='maximumTradeUnits'
                numberFormat={moneyNumberFormat}
                valueExtractor={numericValueExtractor}
                helperText='Maximum trading amount you expect user to trade'
                variant='outlined'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TypedField
                control={control}
                component={NumericInput}
                label='Raised Amount'
                name='raisedAmount'
                numberFormat={moneyNumberFormat}
                valueExtractor={numericValueExtractor}
                helperText='Total amount raised in SGD'
                variant='outlined'
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
