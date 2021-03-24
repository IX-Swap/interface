import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { CorporateInvestorForm } from 'app/pages/_identity/components/CorporateInvestorForm/CorporateInvestorForm'

export const CreateInvestor = () => {
  return (
    <Grid container>
      <Grid container item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <CorporateInvestorForm />
      </Grid>
    </Grid>
  )
}
