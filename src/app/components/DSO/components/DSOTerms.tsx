import { Grid } from '@mui/material'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { DistributionFrequencySelect } from 'components/form/DistributionFrequencySelect'
import { NumericInput } from 'components/form/NumericInput'
import { TypedField } from 'components/form/TypedField'
import { monthsNumberFormat, percentageNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { TextInput } from 'ui/TextInput/TextInput'

export const DSOTerms = () => {
  const { control, watch, setValue } = useFormContext<DSOFormValues>()

  const capitalStructure = watch('capitalStructure')
  const isEquity = capitalStructure === 'Equity'
  const isDebt = capitalStructure === 'Debt'

  useEffect(() => {
    if (isEquity) {
      setValue('interestRate', '')
      setValue('leverage', '')
    } else if (isDebt) {
      setValue('dividendYield', '')
      setValue('grossIRR', '')
      setValue('equityMultiple', '')
    }
  }, [isEquity, isDebt, setValue])

  return (
    <Grid item>
      <Grid container spacing={2} direction='column'>
        <Grid item>
          <FormSectionHeader title='Offering Terms' />
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <TypedField
                control={control}
                component={NumericInput}
                label='Investment Period'
                name='investmentPeriod'
                numberFormat={monthsNumberFormat}
                valueExtractor={numericValueExtractor}
                helperText='In months'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TypedField
                control={control}
                component={NumericInput}
                name='dividendYield'
                label='Dividend Yield'
                numberFormat={percentageNumberFormat}
                valueExtractor={numericValueExtractor}
                variant='outlined'
                disabled={isDebt}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TypedField
                control={control}
                component={NumericInput}
                label='Interest Rate'
                name='interestRate'
                numberFormat={percentageNumberFormat}
                valueExtractor={numericValueExtractor}
                variant='outlined'
                disabled={isEquity}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TypedField
                control={control}
                component={NumericInput}
                name='grossIRR'
                label='Gross IRR'
                numberFormat={percentageNumberFormat}
                valueExtractor={numericValueExtractor}
                variant='outlined'
                disabled={isDebt}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <TypedField
                control={control}
                component={TextInput}
                label='Investment Structure'
                name='investmentStructure'
                variant='outlined'
                helperText='Holding structure of the investment'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TypedField
                control={control}
                component={DistributionFrequencySelect}
                name='distributionFrequency'
                label='Distribution Frequency'
                variant='outlined'
                helperText='Frequency on return distribution'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <TypedField
                control={control}
                component={NumericInput}
                name='leverage'
                label='Leverage'
                numberFormat={percentageNumberFormat}
                valueExtractor={numericValueExtractor}
                variant='outlined'
                helperText='In percent'
                disabled={isEquity}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TypedField
                control={control}
                component={NumericInput}
                name='equityMultiple'
                label='Equity Multiple'
                numberFormat={percentageNumberFormat}
                valueExtractor={numericValueExtractor}
                variant='outlined'
                helperText='In percent'
                disabled={isDebt}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
