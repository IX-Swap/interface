import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import storageHelper from 'v2/helpers/storageHelper'
import { columns } from 'v2/app/pages/accounts/pages/digitalSecurities/DSList/columns'
import { DSTableActions } from 'v2/app/pages/accounts/pages/digitalSecurities/DSList/DSTableActions'
import { Paper } from '@material-ui/core'

export const DSTable: React.FC = () => {
  return (
    <Paper variant='elevation'>
      <TableView
        uri={`/accounts/balance/${storageHelper.getUserId()}`}
        name={`ds-${storageHelper.getUserId()}`}
        columns={columns}
        hasActions
        filter={{ type: 'Security' }}
        actions={({ item }) => <DSTableActions item={item} />}
      />
    </Paper>
  )
}
