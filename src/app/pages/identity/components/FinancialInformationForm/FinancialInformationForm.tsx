import React from 'react'
import { Grid, Typography } from '@mui/material'
import { EmploymentField } from 'app/pages/identity/components/FinancialInformationForm/EmploymentFields'

export const FinancialInformationForm = () => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Typography variant='subtitle2'>Financial Information</Typography>
      </Grid>
      <Grid item>
        <EmploymentField />
      </Grid>
    </Grid>
  )
}
