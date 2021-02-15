import React from 'react'
import { Form } from 'components/form/Form'
import { Grid, Typography } from '@material-ui/core'
import { EmploymentField } from 'app/pages/identity/components/FinancialInformationForm/EmploymentFields'
import { FundSource } from 'app/pages/identity/components/FinancialInformationForm/FundSource'
import { getIdentityFormDefaultValue } from 'app/pages/identity/utils'

export const FinancialInformationForm = () => {
  return (
    <Form defaultValues={getIdentityFormDefaultValue(undefined, 'individual')}>
      <Grid container direction='column' spacing={6}>
        <Grid item>
          <Typography variant='subtitle2'>
            Please provide your financial background
          </Typography>
        </Grid>
        <Grid item>
          <EmploymentField />
        </Grid>
        <Grid item>
          <FundSource />
        </Grid>
      </Grid>
    </Form>
  )
}
