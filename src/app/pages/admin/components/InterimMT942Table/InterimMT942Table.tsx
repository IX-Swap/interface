import { Actions } from './Actions'
import { columns } from './columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualAccountsAudit } from 'config/apiURL'
import { virtualAccountsAuditQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { VirtualAccountAuditItem } from 'types/virtualAccount'

export const InterimMT942Table = () => {
  const { getFilterValue } = useQueryFilter()

  const filter = {
    search: getFilterValue('search'),
    to: getFilterValue('toDate'),
    from: getFilterValue('fromDate')
  }

  return (
    <TableView<VirtualAccountAuditItem>
      uri={virtualAccountsAudit.getMT942Files}
      name={virtualAccountsAuditQueryKeys.getMT942Files}
      columns={columns}
      hasActions
      actions={Actions}
      filter={filter}
      noHeader
      themeVariant={'default'}
      paperProps={{ variant: 'elevation', elevation: 0 }}
    />
  )
}
