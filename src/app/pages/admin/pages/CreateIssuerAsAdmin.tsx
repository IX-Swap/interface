import { Grid } from '@material-ui/core'
import { AdminCorporateIssuerForm } from 'app/pages/admin/components/AdminCorporateIssuerForm/AdminCorporateIssuerForm'
import { VSpacer } from 'components/VSpacer'
import React from 'react'

export const CreateIssuerAsAdmin = () => {
  return (
    <Grid container direction='column'>
      <Grid container item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <AdminCorporateIssuerForm />
      </Grid>
    </Grid>
  )
}
