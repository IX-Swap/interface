import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { columns } from 'v2/app/pages/accounts/pages/banks/BanksList/columns'
import { Bank } from 'v2/types/bank'
import { Actions } from 'v2/app/pages/accounts/pages/banks/BanksList/Actions'
import { useAuth } from '../../../../../../hooks/auth/useAuth'

export const Table: React.FC = () => {
  const { user } = useAuth()
  const userId = user?._id ?? ''

  return (
    <TableView<Bank>
      uri={`/accounts/banks/list/${userId}`}
      name={`banks-${userId}`}
      columns={columns}
      hasActions
      actions={({ item }) => <Actions item={item} />}
    />
  )
}
