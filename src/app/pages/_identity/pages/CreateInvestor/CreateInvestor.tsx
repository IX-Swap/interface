import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { CorporateInvestorForm } from 'app/pages/_identity/components/CorporateInvestorForm/CorporateInvestorForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const CreateInvestor = () => {
  return (
    <Grid container>
      <Grid item>
        <PageHeader title='Create Corporate Investor Identity' />
      </Grid>
      <Grid container item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <CorporateInvestorForm />
      </Grid>
    </Grid>
  )
}
