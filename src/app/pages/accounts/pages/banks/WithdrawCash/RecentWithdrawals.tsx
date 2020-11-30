import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { CashWithdrawal } from 'types/cashWithdrawal'
import columns from 'app/pages/accounts/pages/banks/WithdrawCash/columns'
import { Paper } from '@material-ui/core'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'

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
