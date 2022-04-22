import React from 'react'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'
import { VirtualTransactionsTable } from 'app/pages/admin/components/VirtualTransactionsTable/VirtualTransactionsTable'
import { VirtualTransactionsFilters } from 'app/pages/admin/components/VirtualTransactionsFilters'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const VirtualAccountTransactions = () => {
  const { isMiniLaptop } = useAppBreakpoints()

  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Virtual Account Transactions' />
        <VSpacer size={'medium'} />
      </Grid>
      <Grid item>
        <VirtualTransactionsFilters />
        {isMiniLaptop && <VSpacer size={'small'} />}
      </Grid>
      <Grid item>
        <VirtualTransactionsTable />
      </Grid>
    </Grid>
  )
}
