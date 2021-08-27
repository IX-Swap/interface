import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VirtualTransactionsTable } from 'app/pages/admin/components/VirtualTransactionsTable/VirtualTransactionsTable'
import { VirtualTransactionsFilters } from 'app/pages/admin/components/VirtualTransactionsFilters'

export const VirtualAccountTransactions = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Virtual Account Transactions' />
        <VSpacer size={'medium'} />
      </Grid>
      <Grid item>
        <VirtualTransactionsFilters />
      </Grid>
      <Grid item>
        <VirtualTransactionsTable />
      </Grid>
    </Grid>
  )
}
