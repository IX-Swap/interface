import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { AdminCorporateInvestorForm } from 'app/pages/admin/components/AdminCorporateInvestorForm/AdminCorporateInvestorForm'

export const CreateCorporateAsAdmin = () => {
  return (
    <Grid container>
      <Grid container item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <AdminCorporateInvestorForm />
      </Grid>
    </Grid>
  )
}
