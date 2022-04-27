import React from 'react'
import { TransactionsFilter } from 'app/pages/accounts/pages/transactions/components/TransactionsFilter'
import { TransactionFilterForm } from 'app/pages/accounts/pages/transactions/components/TransactionFilterForm'
import { TransactionsTable } from 'app/pages/accounts/pages/transactions/components/TransactionsTable'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'

export const Transactions = () => {
  return (
    <TransactionFilterForm>
      <Grid container direction='column' style={{ display: 'table' }}>
        <Grid item>
          <PageHeader title='Transactions' />
        </Grid>
        <RootContainer>
          <Grid item>
            <TransactionsFilter />
          </Grid>
          <Grid item>
            <Grid item xs={12}>
              <TransactionsTable />
            </Grid>
          </Grid>
        </RootContainer>
      </Grid>
    </TransactionFilterForm>
  )
}
