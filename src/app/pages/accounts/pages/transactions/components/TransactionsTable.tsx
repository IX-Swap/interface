import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { Transaction } from 'types/transaction'
import columns from 'app/pages/accounts/pages/transactions/columns'
import { useFormContext } from 'react-hook-form'
import { BaseFilter } from 'types/util'
import { useAuth } from 'hooks/auth/useAuth'
import { privateClassNames } from 'helpers/classnames'
import { transactionsQueryKeys } from 'config/queryKeys'

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
    <div className={privateClassNames()}>
      <TableView<Transaction>
        uri={`/accounts/statement/${user?._id ?? ''}`}
        name={transactionsQueryKeys.getByUserId(user?._id ?? '')}
        columns={columns}
        filter={filter}
      />
    </div>
  )
}
