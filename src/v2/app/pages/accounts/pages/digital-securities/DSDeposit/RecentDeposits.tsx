import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import storageHelper from 'v2/helpers/storageHelper'
import { columns } from 'v2/app/pages/accounts/pages/digital-securities/DSDeposit/columns'

export const RecentDeposits: React.FC = () => {
  return (
    <TableView
      uri={`/accounts/security/deposits/list/${storageHelper.getUserId()}`}
      name={`ds-deposits-${storageHelper.getUserId()}`}
      columns={columns}
    />
  )
}
