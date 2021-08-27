import { columns } from './columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualAccountsAudit } from 'config/apiURL'
import { virtualAccountsAuditQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { virtualTransactionsItemSample } from '__fixtures__/virtualAccountsAudit'

export const VirtualTransactionsTable = () => {
  const { getFilterValue } = useQueryFilter()

  const filter = {
    // TODO Make changes filters names after complete backend api endpoints
    search: getFilterValue('search'),
    to: getFilterValue('toDate'),
    from: getFilterValue('fromDate'),
    transferDirection: getFilterValue('transferDirection'),
    currency: getFilterValue('currency'),
    transferType: getFilterValue('transferType')
  }

  return (
    <TableView<any>
      // TODO Make change next 2 line after complete backend api endpoints
      uri={virtualAccountsAudit.getMT940Files}
      name={virtualAccountsAuditQueryKeys.getMT940Files}
      columns={columns}
      filter={filter}
      fakeItems={[1, 2, 3, 4].map(() => virtualTransactionsItemSample)}
      themeVariant={'primary'}
    />
  )
}
