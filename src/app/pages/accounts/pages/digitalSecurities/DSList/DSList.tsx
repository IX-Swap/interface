import React from 'react'
import { DSTable } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSTable'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const DSList: React.FC = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Digital Securities' />
      </Grid>
      <Grid item>
        <DSTable />
      </Grid>
    </Grid>
  )
}
