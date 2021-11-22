import { Actions } from './Actions'
import { columns } from './columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualAccountsAudit } from 'config/apiURL'
import { virtualAccountsAuditQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { VirtualAccountAuditItem } from 'types/virtualAccount'

export const EODMT940Table = () => {
  const { getFilterValue } = useQueryFilter()

  const filter = {
    search: getFilterValue('search'),
    to: getFilterValue('toDate'),
    from: getFilterValue('fromDate')
  }

  return (
    <TableView<VirtualAccountAuditItem>
      uri={virtualAccountsAudit.getMT940Files}
      name={virtualAccountsAuditQueryKeys.getMT940Files}
      columns={columns}
      hasActions
      actions={Actions}
      filter={filter}
      themeVariant={'default'}
      noHeader
      paperProps={{ variant: 'elevation', elevation: 0 }}
    />
  )
}
