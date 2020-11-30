import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/accounts/pages/banks/BanksList/columns'
import { Bank } from 'types/bank'
import { Actions } from 'app/pages/accounts/pages/banks/BanksList/Actions'
import { useAuth } from 'hooks/auth/useAuth'
import { Paper } from '@material-ui/core'
import { getIdFromObj } from 'helpers/strings'

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
