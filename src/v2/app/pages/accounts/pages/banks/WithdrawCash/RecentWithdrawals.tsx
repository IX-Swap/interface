import React from 'react'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { CashWithdrawal } from 'v2/types/cashWithdrawal'
import storageHelper from 'v2/helpers/storageHelper'
import columns from 'v2/app/pages/accounts/pages/banks/WithdrawCash/columns'

export const RecentWithdrawals: React.FC = () => {
  return (
    <TableView<CashWithdrawal>
      uri={`/accounts/cash/withdrawals/list/${storageHelper.getUserId()}`}
      name={`cash-withdrawals-${storageHelper.getUserId()}`}
      columns={columns}
    />
  )
}
