import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { AdminIndividualInvestorForm } from 'app/pages/admin/components/AdminIndividualInvestorForm/AdminIndividualInvestorForm'

export const CreateIndividualAsAdmin: React.FC = () => {
  return (
    <Grid container>
      <Grid container item xs={12}>
        <VSpacer size='medium' />
      </Grid>
      <Grid item xs={12}>
        <AdminIndividualInvestorForm />
      </Grid>
    </Grid>
  )
}
