import { columns, compactColumns } from './tenantsColumns'
import { accountsURL } from 'config/apiURL'
import { useAuth } from 'hooks/auth/useAuth'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { CompactTable } from 'ui/CompactTable/CompactTable'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'

export const TenantsTable: React.FC = () => {
  const { user } = useAuth()
  const { isTablet } = useAppBreakpoints()
  const userId = user?._id
  if (userId === undefined) {
    return null
  }

  return (
    <TableView
      uri={accountsURL.virtualAccounts.getUserTransactions(userId)}
      columns={columns}
      noHeader={isTablet}
      paginationPlacement={isTablet ? 'both' : 'bottom'}
    >
      {isTablet
        ? (props: TableViewRendererProps<any[]>) => (
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
