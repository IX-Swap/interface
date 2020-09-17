import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { CashDeposit } from 'v2/types/cashdeposit'
import { columns } from 'v2/app/pages/accounts/pages/banks/DepositCash/columns'
import { useAuth } from 'v2/hooks/auth/useAuth'

export const RecentDeposits: React.FC = () => {
  const { user } = useAuth()
  const userId = user !== undefined ? user._id : ''

  return (
    <TableView<CashDeposit>
      uri={`/accounts/cash/deposits/list/${userId}`}
      name={`cash-deposits-${userId}`}
      columns={columns}
    />
  )
}
