import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { IndividualInvestorForm } from 'app/pages/_identity/components/IndividualInvestorForm/IndividualInvestorForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

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
