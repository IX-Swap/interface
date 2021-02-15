import React from 'react'
import { Grid } from '@material-ui/core'
import { FundSourceFields } from 'app/pages/identity/components/FinancialInformationForm/FundSourceFields'
import { FundSourceHeader } from 'app/pages/identity/components/FinancialInformationForm/FundSourceHeader'

export const FundSource = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <FundSourceHeader />
      </Grid>
      <Grid item>
        <FundSourceFields />
      </Grid>
    </Grid>
  )
}
