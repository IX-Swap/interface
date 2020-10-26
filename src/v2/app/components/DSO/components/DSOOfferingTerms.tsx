import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { monthsFormat, percentageFormat } from 'v2/config/numberFormat'
import { TypedField } from 'v2/components/form/TypedField'
import { NumericInput } from 'v2/components/form/NumericInput'
import { numericValueExtractor } from 'v2/helpers/forms'
import { DistributionFrequencySelect } from 'v2/components/form/DistributionFrequencySelect'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'

export const DSOOfferingTerms = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Offering Terms' item xs={12}>
      <Grid item container spacing={2}>
        <Grid item xs={4} container direction='column' spacing={2}>
          <Grid item>
            <TypedField
              control={control}
              component={NumericInput}
              label='Investment Period'
              name='investmentPeriod'
              numberFormat={monthsFormat}
              valueExtractor={numericValueExtractor}
            />
          </Grid>

          <Grid item>
            <TypedField
              control={control}
              component={Input}
              label='Investment Structure'
              name='investmentStructure'
            />
          </Grid>

          <Grid item>
            <TypedField
              control={control}
              component={NumericInput}
              label='Interest Rate'
              name='interestRate'
              numberFormat={percentageFormat}
              valueExtractor={numericValueExtractor}
            />
          </Grid>
        </Grid>

        <Grid item xs={4} container direction='column' spacing={2}>
          <Grid item>
            <TypedField
              control={control}
              component={NumericInput}
              name='dividendYield'
              label='Dividend Yield'
              numberFormat={percentageFormat}
              valueExtractor={numericValueExtractor}
            />
          </Grid>

          <Grid item>
            <TypedField
              control={control}
              component={NumericInput}
              name='equityMultiple'
              label='Equity Multiple'
              numberFormat={percentageFormat}
              valueExtractor={numericValueExtractor}
            />
          </Grid>

          <Grid item>
            <TypedField
              control={control}
              component={NumericInput}
              name='leverage'
              label='Leverage'
              numberFormat={percentageFormat}
              valueExtractor={numericValueExtractor}
            />
          </Grid>
        </Grid>

        <Grid item xs={4} container direction='column' spacing={2}>
          <Grid item>
            <TypedField
              control={control}
              component={NumericInput}
              name='grossIRR'
              label='Gross IRR'
              numberFormat={percentageFormat}
              valueExtractor={numericValueExtractor}
            />
          </Grid>

          <Grid item>
            <TypedField
              control={control}
              component={DistributionFrequencySelect}
              name='distributionFrequency'
              label='Distribution Frequency'
            />
          </Grid>
        </Grid>
      </Grid>
    </DSOContainer>
  )
}
