import React from 'react'
import { Actions } from './Actions'
import { columns } from './columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualAccountsAudit } from 'config/apiURL'
import { virtualAccountsAuditQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { VAAuditOutboundItem } from 'types/virtualAccount'

export const OutboundTable = () => {
  const { getFilterValue } = useQueryFilter()

  const filter = {
    search: getFilterValue('search'),
    to: getFilterValue('toDate'),
    from: getFilterValue('fromDate')
  }

  return (
    <TableView<VAAuditOutboundItem>
      uri={virtualAccountsAudit.getOutboundFiles}
      name={virtualAccountsAuditQueryKeys.getOutboundFiles}
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
