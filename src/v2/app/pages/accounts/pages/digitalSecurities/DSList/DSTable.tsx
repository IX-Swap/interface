import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { columns } from 'v2/app/pages/accounts/pages/digitalSecurities/DSList/columns'
import { DSTableActions } from 'v2/app/pages/accounts/pages/digitalSecurities/DSList/DSTableActions'
import { Paper } from '@material-ui/core'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { getIdFromObj } from 'v2/helpers/strings'

export const DSTable: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <Paper variant='elevation'>
      <TableView
        uri={`/accounts/balance/${userId}`}
        name={`ds-${userId}`}
        columns={columns}
        hasActions
        filter={{ type: 'Security' }}
        actions={DSTableActions}
      />
    </Paper>
  )
}
