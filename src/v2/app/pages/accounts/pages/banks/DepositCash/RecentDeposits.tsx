import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { CashDeposit } from 'v2/types/cashdeposit'
import { columns } from 'v2/app/pages/accounts/pages/banks/DepositCash/columns'
import { useUser } from 'v2/auth/hooks/useUser'

export const RecentDeposits: React.FC = () => {
  const { data: user } = useUser()
  const userId = user !== undefined ? user._id : ''

  return (
    <TableView<CashDeposit>
      uri={`/accounts/cash/deposits/list/${userId}`}
      name={`cash-deposits-${userId}`}
      columns={columns}
    />
  )
}
