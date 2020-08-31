import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { CashDeposit } from 'v2/types/cashdeposit'
import { columns } from 'v2/app/accounts/banks/DepositCash/columns'
import { useUserStore } from 'v2/auth/context'

export const RecentDeposits: React.FC = () => {
  const { user } = useUserStore()
  const userId = user !== undefined ? user._id : ''

  return (
    <TableView<CashDeposit>
      uri={`/accounts/cash/deposits/list/${userId}`}
      name={`cash-deposits-${userId}`}
      columns={columns}
    />
  )
}
