import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { CashDeposit } from 'types/cashDeposit'
import { columns } from 'app/pages/accounts/pages/banks/DepositCash/columns'
import { useAuth } from 'hooks/auth/useAuth'
import { Paper } from '@material-ui/core'
import { getIdFromObj } from 'helpers/strings'
import { cashDepositsQueryKeys } from 'config/queryKeys'

export const RecentDeposits: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <Paper variant='elevation'>
      <TableView<CashDeposit>
        uri={`/accounts/cash/deposits/list/${userId}`}
        name={cashDepositsQueryKeys.getByUserId(userId)}
        columns={columns}
      />
    </Paper>
  )
}
