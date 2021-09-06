import React from 'react'
import { columns } from './columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualAccountsAudit } from 'config/apiURL'
import { virtualAccountsAuditQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const CustodyManagementTable = () => {
  const { getFilterValue } = useQueryFilter()

  const filter = {
    search: getFilterValue('search'),
    to: getFilterValue('toDate'),
    from: getFilterValue('fromDate'),
    // TODO Change filter name if it needs after complete backend api endpoints
    custodianFilter: getFilterValue('custodianFilter')
  }

  return (
    <TableView<any>
      // TODO Change next 2 lines after complete backend api endpoints
      uri={virtualAccountsAudit.getOutboundFiles}
      name={virtualAccountsAuditQueryKeys.getOutboundFiles}
      columns={columns}
      // TODO Remove fake items after complete backend api endpoints
      fakeItems={[
        {
          assigned: '3 mins ago',
          status: 'Closed',
          investor: 'Delphine Stark',
          custodian: 'InvestaX',
          walletAddress: '0xFd...51eb',
          accountID: '323456789014'
        },
        {
          assigned: '2 mins ago',
          status: 'Active',
          investor: 'Jovany Dooley',
          custodian: 'HEX',
          walletAddress: '0xFd...17e3',
          accountID: '323456789014'
        }
      ]}
      filter={filter}
      themeVariant={'primary'}
      paperProps={{ variant: 'elevation', elevation: 0 }}
    />
  )
}
