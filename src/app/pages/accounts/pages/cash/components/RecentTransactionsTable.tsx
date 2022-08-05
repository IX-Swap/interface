import {
  columns,
  compactColumns
} from 'app/pages/accounts/pages/cash/components/transactionColumns'
import { accountsURL } from 'config/apiURL'
import { cashVirtualTransactionsQueryKeys } from 'config/queryKeys'
import { useAuth } from 'hooks/auth/useAuth'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { CashDeposit } from 'types/cashDeposit'
import { CashWithdrawal } from 'types/cashWithdrawal'
import { CompactTable } from 'ui/CompactTable/CompactTable'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { useTransactionFilters } from '../hooks/useTransactionFilters'

export const RecentTransactionsTable: React.FC = () => {
  const { user } = useAuth()
  const { isTablet } = useAppBreakpoints()
  const userId = user?._id
  const { filter, sortBy, orderBy } = useTransactionFilters()
  if (userId === undefined) {
    return null
  }

  return (
    <TableView<CashWithdrawal | CashDeposit>
      uri={accountsURL.virtualAccounts.getUserTransactions(userId)}
      name={cashVirtualTransactionsQueryKeys.getByVirtualAccount(
        userId,
        sortBy,
        orderBy
      )}
      columns={columns}
      noHeader={isTablet}
      filter={filter}
      paginationPlacement={isTablet ? 'both' : 'bottom'}
    >
      {isTablet
        ? (props: TableViewRendererProps<CashWithdrawal | CashDeposit>) => (
            <CompactTable
              {...props}
              columns={compactColumns}
              renderActionButton={() => null}
            />
          )
        : undefined}
    </TableView>
  )
}
