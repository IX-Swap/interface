import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, TextField, Typography } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { TypedField } from 'components/form/TypedField'
import { AnnualIncomeSelect } from 'components/form/AnnualIncomeSelect'
import { EmploymentStatusSelect } from 'app/pages/identity/components/FinancialInformationForm/EmploymentStatusSelect'
import { OccupationSelect } from './OccupationSelect'

export const EmploymentField = () => {
  const { control } = useFormContext()

  return (
    <Grid container direction='column'>
      <Grid item>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <TypedField
              component={OccupationSelect}
              control={control}
              variant='outlined'
              name='occupation'
              label='Occupation'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TypedField
              component={EmploymentStatusSelect}
              control={control}
              variant='outlined'
              name='employmentStatus'
              label='Employment Status'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TypedField
              component={TextField}
              control={control}
              variant='outlined'
              name='employer'
              label='Employer'
              helperText='Name of the company you own or you are employed'
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant='subtitle1'>
          Income in SGD in preceding 12 months:
        </Typography>
        <VSpacer size='small' />
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <TypedField
              component={AnnualIncomeSelect}
              control={control}
              variant='outlined'
              name='annualIncome'
              label='Please select one'
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
