import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import storageHelper from 'v2/helpers/storageHelper'
import columns from 'v2/app/pages/accounts/pages/transactions/columns'
import { Paper, Grid } from '@material-ui/core'
import { Transaction } from 'v2/types/transaction'

export const Transactions = () => {
  return (
    <Paper>
      <Grid container direction='column'>
        <Grid item xs={12}>
          <TableView<Transaction>
            uri={`/accounts/statement/${storageHelper.getUserId()}`}
            name={`transactions-${storageHelper.getUserId()}`}
            columns={columns}
            filter={{ asset: '' }}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}
