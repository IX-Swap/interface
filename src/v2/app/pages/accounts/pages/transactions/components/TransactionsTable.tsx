import React from 'react'
import { Paper } from '@material-ui/core'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { Transaction } from 'v2/types/transaction'
import columns from 'v2/app/pages/accounts/pages/transactions/columns'
import { useFormContext } from 'react-hook-form'
import { BaseFilter } from 'v2/types/util'
import { useAuth } from 'v2/hooks/auth/useAuth'

export const TransactionsTable = () => {
  const { watch } = useFormContext()
  const { user } = useAuth()
  const { from, to, asset } = watch(['from', 'to', 'asset'])
  const filter: BaseFilter = { asset }

  if (from !== null) {
    filter.from = from
  }

  if (to !== null) {
    filter.to = to
  }

  return (
    <Paper>
      <TableView<Transaction>
        uri={`/accounts/statement/${user?._id ?? ''}`}
        name={`transactions-${user?._id ?? ''}`}
        columns={columns}
        filter={filter}
      />
    </Paper>
  )
}
