import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { TypedField } from 'v2/components/form/TypedField'
import { NumericInput } from 'v2/components/form/NumericInput'
import { moneyNumberFormat } from 'v2/config/numberFormat'
import { numericValueExtractor } from 'v2/helpers/forms'
import { useFormContext } from 'react-hook-form'
import { IndividualIdentityFormValues } from 'v2/app/pages/identity/components/types'

export const FinancialFields = (): JSX.Element => {
  const { control } = useFormContext<IndividualIdentityFormValues>()

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
    </Grid>
  )
}
