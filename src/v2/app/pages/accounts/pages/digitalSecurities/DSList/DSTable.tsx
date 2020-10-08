import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import storageHelper from 'v2/helpers/storageHelper'
import { columns } from 'v2/app/pages/accounts/pages/digitalSecurities/DSList/columns'
import { DSTableActions } from 'v2/app/pages/accounts/pages/digitalSecurities/DSList/DSTableActions'

export const DSTable: React.FC = () => {
  return (
    <TableView
      uri={`/accounts/balance/${storageHelper.getUserId()}`}
      name={`ds-${storageHelper.getUserId()}`}
      columns={columns}
      hasActions
      filter={{ type: 'Security' }}
      actions={({ item }) => <DSTableActions item={item} />}
    />
  )
}
