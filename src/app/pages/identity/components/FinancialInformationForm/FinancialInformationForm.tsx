import React from 'react'
import { Grid } from '@mui/material'
import { EmploymentField } from 'app/pages/identity/components/FinancialInformationForm/EmploymentFields'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'

export const FinancialInformationForm = () => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <FormSectionHeader title='Financial Information' />
      </Grid>
      <Grid item>
        <EmploymentField />
      </Grid>
    </Grid>
  )
}
