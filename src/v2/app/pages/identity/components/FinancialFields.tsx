import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { TypedField } from 'v2/components/form/TypedField'
import { NumericInput } from 'v2/components/form/NumericInput'
import { moneyNumberFormat } from 'v2/app/components/DSO/utils'
import { Checkbox } from 'v2/components/form/Checkbox'
import { booleanValueExtractor, numericValueExtractor } from 'v2/helpers/forms'
import { useFormContext } from 'react-hook-form'

export const FinancialFields = (): JSX.Element => {
  const { control } = useFormContext() // TODO: add types

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <TypedField
          component={Input}
          control={control}
          name='occupation'
          label='Occupation'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          component={Input}
          control={control}
          name='employer'
          label='Employer'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          component={Input}
          control={control}
          name='employmentStatus'
          label='Employment Status'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          component={Input}
          control={control}
          name='industryOfEmployment'
          label='Industry'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          component={Input}
          control={control}
          name='walletAddress'
          label='Digital Security Wallet Address'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          control={control}
          name='annualIncome'
          label='Annual Income'
          component={NumericInput}
          valueExtractor={numericValueExtractor}
          numberFormat={moneyNumberFormat}
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          control={control}
          name='houseHoldIncome'
          label='Household Income'
          component={NumericInput}
          valueExtractor={numericValueExtractor}
          numberFormat={moneyNumberFormat}
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          component={Input}
          control={control}
          name='sourceOfWealth'
          label='Source of Income'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          component={Input}
          control={control}
          name='bankName'
          label='Bank Name'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          component={Input}
          control={control}
          name='bankAccountName'
          label='Name of Bank Account'
        />
      </Grid>
      <Grid item xs={4}>
        <TypedField
          component={Input}
          control={control}
          name='bankAccountNumber'
          label='Bank Account Number'
        />
      </Grid>
      <Grid item xs={5}>
        {/* @ts-ignore  */}
        <TypedField
          customRenderer
          component={Checkbox}
          valueExtractor={booleanValueExtractor}
          control={control}
          name='toArrangeCustody'
          label='I would like InvestaX to arrange digital security custody'
        />
      </Grid>
    </Grid>
  )
}
