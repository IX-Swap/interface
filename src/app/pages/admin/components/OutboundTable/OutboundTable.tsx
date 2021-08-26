import { Actions } from './Actions'
import { columns } from './columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualAccountsAudit } from 'config/apiURL'
import { virtualAccountsAuditQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { VAAuditOutboundItem } from 'types/virtualAccount'
import { virtualAccountsAuditOutboundItemSample } from '__fixtures__/virtualAccountsAudit'

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
      // TODO Delete next line after complete backend api endpoints
      fakeItems={[1, 2, 3, 4].map(() => virtualAccountsAuditOutboundItemSample)}
      themeVariant={'no-header'}
      paperProps={{ variant: 'elevation', elevation: 0 }}
    />
  )
}
