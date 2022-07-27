import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'
import { Actions } from 'app/pages/accounts/pages/banks/pages/BanksList/Actions'
import {
  columns,
  compactColumns
} from 'app/pages/accounts/pages/banks/pages/BanksList/columns'
import { banksQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { Bank } from 'types/bank'
import { CompactTable } from 'ui/CompactTable/CompactTable'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { MobileMenu } from './MobileMenu'

export const Table: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { isTablet } = useAppBreakpoints()
  return (
    <ActiveElementContextWrapper>
      <TableView<Bank>
        uri={`/accounts/banks/list/${userId}`}
        name={banksQueryKeys.getListByUserId(userId)}
        columns={columns}
        actions={Actions}
        noHeader={isTablet}
      >
        {isTablet
          ? (props: TableViewRendererProps<Bank>) => (
              <CompactTable
                {...props}
                columns={compactColumns}
                menu={<MobileMenu items={props.items} />}
              />
            )
          : undefined}
      </TableView>
    </ActiveElementContextWrapper>
  )
}
