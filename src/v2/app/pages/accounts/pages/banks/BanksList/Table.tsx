import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { columns } from 'v2/app/pages/accounts/pages/banks/BanksList/columns'
import { Bank } from 'v2/types/bank'
import { Actions } from 'v2/app/pages/accounts/pages/banks/BanksList/Actions'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { Paper } from '@material-ui/core'
import { getIdFromObj } from 'v2/helpers/strings'

export const Table: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <Paper variant='elevation'>
      <TableView<Bank>
        uri={`/accounts/banks/list/${userId}`}
        name={`banks-${userId}`}
        columns={columns}
        hasActions
        actions={Actions}
      />
    </Paper>
  )
}
