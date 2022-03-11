import React from 'react'
import { moneyNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'
import { Grid } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { NumericInput } from 'components/form/NumericInput'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { MinimumInvesmentField } from 'components/form/MinimumInvestmentField'
import { DSOMinimumInvestment } from 'app/components/DSO/components/DSOMinimumInvestment'
import { DSOTotalUnits } from 'app/components/DSO/components/DSOTotalUnits'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

export const DSOPricing = () => {
  const { control } = useFormContext<DSOFormValues>()

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
                label='Unit Price'
                name='pricePerUnit'
                numberFormat={moneyNumberFormat}
                valueExtractor={numericValueExtractor}
                helperText='Base price you want to sell your offering'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TypedField
                control={control}
                component={NumericInput}
                label='Total Fundraising Amount'
                name='totalFundraisingAmount'
                numberFormat={moneyNumberFormat}
                valueExtractor={numericValueExtractor}
                helperText='Amount you want to raise'
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
                component={MinimumInvesmentField}
                label='Minimum Investment'
                name='minimumInvestment'
                numberFormat={moneyNumberFormat}
                valueExtractor={numericValueExtractor}
                helperText='Minimum units investor should invest'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DSOMinimumInvestment />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <DSOTotalUnits />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
