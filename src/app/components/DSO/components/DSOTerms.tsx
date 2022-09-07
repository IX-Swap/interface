import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { DistributionFrequencySelect } from 'components/form/DistributionFrequencySelect'
import { NumericInput } from 'components/form/NumericInput'
import { TypedField } from 'components/form/TypedField'
import { VSpacer } from 'components/VSpacer'
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
  const theme = useTheme()
  const greyText = theme.palette.mode === 'dark' ? 500 : 600

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
      <Grid container spacing={2} py={2} direction='column'>
        <Grid item>
          <Grid container>
            <FormSectionHeader hasBorderBottom={false} title='Offering Terms' />
            <p
              style={{
                color: theme.palette.grey[greyText],
                marginLeft: '0.5rem'
              }}
            >
              (Optional)
            </p>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TypedField
                control={control}
                component={NumericInput}
                name='dividendYield'
                label='Dividend Yield'
                isOptional
                helperText='In percent'
                numberFormat={percentageNumberFormat}
                valueExtractor={numericValueExtractor}
                variant='outlined'
                disabled={isDebt}
              />
            </Grid>
          </Grid>
          <VSpacer size='small' />
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TypedField
                control={control}
                component={NumericInput}
                label='Interest Rate'
                helperText='In percent'
                name='interestRate'
                isOptional
                numberFormat={percentageNumberFormat}
                valueExtractor={numericValueExtractor}
                variant='outlined'
                disabled={isEquity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TypedField
                control={control}
                component={NumericInput}
                name='grossIRR'
                label='Gross IRR'
                isOptional
                helperText='In percent'
                numberFormat={percentageNumberFormat}
                valueExtractor={numericValueExtractor}
                variant='outlined'
                disabled={isDebt}
              />
            </Grid>
          </Grid>
          <VSpacer size='small' />
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TypedField
                control={control}
                component={TextInput}
                label='Investment Structure'
                isOptional
                name='investmentStructure'
                variant='outlined'
                helperText='Holding structure'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
          <VSpacer size='small' />
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TypedField
                control={control}
                component={NumericInput}
                name='leverage'
                label='Leverage'
                isOptional
                numberFormat={percentageNumberFormat}
                valueExtractor={numericValueExtractor}
                variant='outlined'
                helperText='In percent'
                disabled={isEquity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
          <VSpacer size='small' />
        </Grid>
      </Grid>
    </Grid>
  )
}
