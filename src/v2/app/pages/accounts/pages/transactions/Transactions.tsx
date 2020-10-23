import React from 'react'
import { TransactionsFilter } from 'v2/app/pages/accounts/pages/transactions/components/TransactionsFilter'
import { TransactionFilterForm } from 'v2/app/pages/accounts/pages/transactions/components/TransactionFilterForm'
import { TransactionsTable } from 'v2/app/pages/accounts/pages/transactions/components/TransactionsTable'
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
