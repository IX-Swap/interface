import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { CashWithdrawal } from 'types/cashWithdrawal'
import columns from 'app/pages/accounts/pages/banks/WithdrawCash/columns'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { cashWithdrawalsQueryKeys } from 'config/queryKeys'

export const RecentWithdrawals: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <TableView<CashWithdrawal>
      uri={`/accounts/cash/withdrawals/list/${userId}`}
      name={cashWithdrawalsQueryKeys.getByUserId(userId)}
      columns={columns}
    />
  )
}
