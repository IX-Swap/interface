import { columns } from './columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualTransactions } from 'config/apiURL'
import { virtualTransactionsQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { VirtualTransaction } from 'types/transaction'

export const VirtualTransactionsTable = () => {
  const { getFilterValue } = useQueryFilter()
  const transferDirection = getFilterValue('transferDirection')
  const getCorrectDirectionFilterValues = () => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (transferDirection?.includes(' to ')) {
      return transferDirection?.replace(' to ', '2')
    }
    return transferDirection
  }

  const filter = {
    search: getFilterValue('search'),
    to: getFilterValue('toDate'),
    from: getFilterValue('fromDate'),
    direction: getCorrectDirectionFilterValues(),
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
