import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { CashDeposit } from 'v2/types/cashDeposit'
import { columns } from 'v2/app/pages/accounts/pages/banks/DepositCash/columns'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { Paper } from '@material-ui/core'
import { getIdFromObj } from 'v2/helpers/strings'

export const RecentDeposits: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <Paper variant='elevation'>
      <TableView<CashDeposit>
        uri={`/accounts/cash/deposits/list/${userId}`}
        name={`cash-deposits-${userId}`}
        columns={columns}
      />
    </Paper>
  )
}
