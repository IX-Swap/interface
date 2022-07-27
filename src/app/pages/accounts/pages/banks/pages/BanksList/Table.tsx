import React from 'react'
import {
  columns,
  compactColumns
} from 'app/pages/accounts/pages/banks/pages/BanksList/columns'
import { Bank } from 'types/bank'
import { Actions } from 'app/pages/accounts/pages/banks/pages/BanksList/Actions'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { banksQueryKeys } from 'config/queryKeys'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { CompactBankList } from './CompactBankList'
import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'

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
              <CompactBankList {...props} columns={compactColumns} />
            )
          : undefined}
      </TableView>
    </ActiveElementContextWrapper>
  )
}
