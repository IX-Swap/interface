import React from 'react'
import { TransactionsFilter } from 'app/pages/accounts/pages/transactions/components/TransactionsFilter'
import { TransactionFilterForm } from 'app/pages/accounts/pages/transactions/components/TransactionFilterForm'
import { TransactionsTable } from 'app/pages/accounts/pages/transactions/components/TransactionsTable'
import { Grid } from '@material-ui/core'

export const Transactions = () => {
  return (
    <TransactionFilterForm>
      <Grid container direction='column'>
        <Grid item>
          <TransactionsFilter />
        </Grid>
        <Grid item>
          <Grid item xs={12}>
            <TransactionsTable />
          </Grid>
        </Grid>
      </Grid>
    </TransactionFilterForm>
  )
}
