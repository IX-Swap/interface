import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { CashDeposit } from 'types/cashDeposit'
import { columns } from 'app/pages/accounts/pages/banks/pages/DepositCash/columns'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { cashDepositsQueryKeys } from 'config/queryKeys'

export const RecentDeposits: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <TableView<CashDeposit>
      uri={`/accounts/cash/deposits/list/${userId}`}
      name={cashDepositsQueryKeys.getByUserId(userId)}
      columns={columns}
    />
  )
}
