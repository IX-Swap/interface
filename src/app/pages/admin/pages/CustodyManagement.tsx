import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CustodyManagementTable } from 'app/pages/admin/components/CustodyManagementTable/CustodyManagementTable'
import { CustodyManagementFilters } from 'app/pages/admin/components/CustodyManagementFilters'
import { AccountsUnderCustody } from 'app/pages/admin/components/AccountsUnderCustody'

export const CustodyManagement = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Custody Management' />
        <VSpacer size={'small'} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} lg={4}>
        <AccountsUnderCustody />
        <VSpacer size={'medium'} />
      </Grid>
      <Grid item>
        <CustodyManagementFilters />
        <VSpacer size={'medium'} />
      </Grid>
      <Grid item>
        <CustodyManagementTable />
      </Grid>
    </Grid>
  )
}
