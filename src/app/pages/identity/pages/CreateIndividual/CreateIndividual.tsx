import React from 'react'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { IndividualInvestorForm } from 'app/pages/identity/components/IndividualInvestorForm/IndividualInvestorForm'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'

export const CreateIndividual: React.FC = () => {
  return (
    <Grid container>
      <Grid container item xs={12}>
        <PageHeader title='Create Individual Identity' />
      </Grid>
      <Grid container item xs={12}>
        <VSpacer size='medium' />
      </Grid>
      <Grid item xs={12}>
        <IndividualInvestorForm />
      </Grid>
    </Grid>
  )
}
