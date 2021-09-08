import { columns } from './columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualTransactions } from 'config/apiURL'
import { virtualTransactionsQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { VirtualTransaction } from 'types/transaction'
import { getCorrectDirectionFilterValues } from 'app/pages/admin/components/VirtualTransactionsTable/utils'

export const VirtualTransactionsTable = () => {
  const { getFilterValue } = useQueryFilter()
  const filter = {
    search: getFilterValue('search'),
    to: getFilterValue('toDate'),
    from: getFilterValue('fromDate'),
    direction: getCorrectDirectionFilterValues(
      getFilterValue('transferDirection')
    ),
    currency: getFilterValue('currency'),
    paymentMethod: getFilterValue('transferType')
  }

  return (
    <TableView<VirtualTransaction>
      uri={virtualTransactions.getTransactions}
      name={virtualTransactionsQueryKeys.getTransactions}
      columns={columns}
      filter={filter}
      themeVariant={'primary'}
    />
  )
}
