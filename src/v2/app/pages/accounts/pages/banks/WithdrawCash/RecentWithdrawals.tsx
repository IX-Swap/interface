import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { CashWithdrawal } from 'v2/types/cashWithdrawal'
import columns from 'v2/app/pages/accounts/pages/banks/WithdrawCash/columns'
import { Paper } from '@material-ui/core'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { getIdFromObj } from 'v2/helpers/strings'

export const RecentWithdrawals: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <Paper variant='elevation'>
      <TableView<CashWithdrawal>
        uri={`/accounts/cash/withdrawals/list/${userId}`}
        name={`cash-withdrawals-${userId}`}
        columns={columns}
      />
    </Paper>
  )
}
