import React from 'react'
import { columns } from 'app/pages/accounts/pages/banks/pages/BanksList/columns'
import { Bank } from 'types/bank'
import { Actions } from 'app/pages/accounts/pages/banks/pages/BanksList/Actions'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { banksQueryKeys } from 'config/queryKeys'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
export const Table: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <TableView<Bank>
      uri={`/accounts/banks/list/${userId}`}
      name={banksQueryKeys.getListByUserId(userId)}
      columns={columns}
      actions={Actions}
    />
  )
}
