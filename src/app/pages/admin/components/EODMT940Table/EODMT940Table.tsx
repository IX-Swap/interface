import { Actions } from './Actions'
import { columns } from './columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualAccountsAudit } from 'config/apiURL'
import { virtualAccountsAuditQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { VirtualAccountAuditItem } from 'types/virtualAccount'
import { virtualAccountsAuditSample } from '__fixtures__/virtualAccountsAudit'

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
      themeVariant={'no-header'}
      // TODO Remove next line after complete backend api endpoints
      fakeItems={virtualAccountsAuditSample as any}
      paperProps={{ variant: 'elevation', elevation: 0 }}
    />
  )
}
