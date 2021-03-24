import { Grid } from '@material-ui/core'
import { CorporateIssuerForm } from 'app/pages/_identity/components/CorporateIssuerForm/CorporateIssuerForm'
import { VSpacer } from 'components/VSpacer'
import React from 'react'

export const CreateIssuer = () => {
  return (
    <Grid container>
      <Grid container item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <CorporateIssuerForm />
      </Grid>
    </Grid>
  )
}
