import React from 'react'
import { Grid, TextField, Typography } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { AnnualIncomeSelect } from 'components/form/AnnualIncomeSelect'
import { VSpacer } from 'components/VSpacer'

export const EmploymentField = () => {
  const { control } = useFormContext()

  return (
    <Grid container direction='column'>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TypedField
              component={TextField}
              control={control}
              variant='outlined'
              name='occupation'
              label='Occupation'
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
          <Grid item xs={12} md={4}>
            <TypedField
              component={TextField}
              control={control}
              variant='outlined'
              name='employmentStatus'
              label='Employment Status'
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant='subtitle1'>Annual Net Income in SGD:</Typography>
        <VSpacer size='small' />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TypedField
              component={AnnualIncomeSelect}
              control={control}
              variant='outlined'
              name='annualIncome'
              label='Annual Income'
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
