import React from 'react'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VirtualTransactionsTable } from 'app/pages/admin/components/VirtualTransactionsTable/VirtualTransactionsTable'
import { VirtualTransactionsFilters } from 'app/pages/admin/components/VirtualTransactionsFilters'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { RootContainer } from 'ui/RootContainer'

export const VirtualAccountTransactions = () => {
  const { isMiniLaptop } = useAppBreakpoints()

  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Virtual Account Transactions' />
        <VSpacer size={'medium'} />
      </Grid>
      <RootContainer>
        <Grid item>
          <VirtualTransactionsFilters />
          {isMiniLaptop && <VSpacer size={'small'} />}
        </Grid>
        <Grid item>
          <VirtualTransactionsTable />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
