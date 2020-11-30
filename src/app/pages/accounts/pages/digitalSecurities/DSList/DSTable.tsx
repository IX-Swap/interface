import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/accounts/pages/digitalSecurities/DSList/columns'
import { DSTableActions } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSTableActions'
import { Paper } from '@material-ui/core'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'

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
