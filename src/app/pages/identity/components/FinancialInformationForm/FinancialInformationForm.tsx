import React from 'react'
import { Grid, Typography } from '@mui/material'
import { EmploymentField } from 'app/pages/identity/components/FinancialInformationForm/EmploymentFields'
import { FundSource } from 'app/pages/identity/components/FinancialInformationForm/FundSource'
import { NoticeOfAssesment } from 'app/pages/identity/components/FinancialInformationForm/NoticeOfAssesment/NoticeOfAssesment'

export const FinancialInformationForm = () => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Typography variant='subtitle2'>
          Please provide your financial background
        </Typography>
      </Grid>
      <Grid item>
        <EmploymentField />
      </Grid>
      <Grid item xs={12}>
        <NoticeOfAssesment />
      </Grid>
      <Grid item>
        <FundSource />
      </Grid>
    </Grid>
  )
}
