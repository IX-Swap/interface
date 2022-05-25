import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { EmploymentStatusSelect } from 'app/pages/identity/components/FinancialInformationForm/EmploymentStatusSelect'
import { OccupationSelect } from './OccupationSelect'
import { TextInput } from 'ui/TextInput/TextInput'
import { FundSourceSelect } from 'components/form/FundSourceSelect'
import { OptionalLabel } from 'components/form/OptionalLabel'
import { AnnualIncomeSelect } from 'components/form/AnnualIncomeSelect'

export const EmploymentField = () => {
  const { control } = useFormContext()

  return (
    <Grid container direction='column'>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TypedField
              component={OccupationSelect}
              control={control}
              variant='outlined'
              name='occupation'
              label={<OptionalLabel label='Occupation' />}
              placeholder='Occupation'
              data-testid='Occupation-select'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TypedField
              component={EmploymentStatusSelect}
              control={control}
              variant='outlined'
              name='employmentStatus'
              label='Employment Sector'
              data-testid='Employment-select'
              fullWidth
              placeholder='Select Employment Sector'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TypedField
              component={TextInput}
              control={control}
              variant='outlined'
              name='employer'
              label='Employer'
              placeholder='Name of the company'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TypedField
              component={AnnualIncomeSelect}
              control={control}
              variant='outlined'
              name='annualIncome'
              label='Income in SGD in preceding 12 months'
              placeholder='Select Income'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TypedField
              component={FundSourceSelect}
              control={control}
              variant='outlined'
              name='sourceOfFund'
              label='Source of funds'
              placeholder='Select Source Of Funds'
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
