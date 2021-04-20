import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { AddVirtualAccountsButton } from 'app/pages/admin/components/AddVirtualAccountsButton/AddVirtualAccountsButton'
import React from 'react'

export const Identities = () => {
  return (
    <Grid container direction='column'>
      <Grid item xs={12}>
        <PageHeader title='Identities' />
      </Grid>
      <Grid item xs={12}>
        <AddVirtualAccountsButton />
      </Grid>
    </Grid>
  )
}
