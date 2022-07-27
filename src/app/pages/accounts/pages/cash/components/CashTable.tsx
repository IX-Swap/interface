import {
  columns,
  compactColumns
} from 'app/pages/accounts/pages/cash/components/columns'
import { balanceQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import React from 'react'
import { ConvertedAssetBalance } from 'types/balance'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { Actions } from 'app/pages/accounts/pages/cash/components/Actions'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { CompactTable } from 'ui/CompactTable/CompactTable'
import { MobileMenu } from 'ui/CompactTable/MobileMenu'
import { MobileActions } from 'app/pages/accounts/pages/cash/components/MobileActions'
import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'

export const CashTable: React.FC = () => {
  const { user } = useAuth()
  const { isTablet } = useAppBreakpoints()
  const titleExtractor = (item: ConvertedAssetBalance) => {
    return item.currency
  }
  return (
    <ActiveElementContextWrapper>
      <TableView<ConvertedAssetBalance>
        uri={`/virtual-accounts/${getIdFromObj(user)}`}
        name={balanceQueryKeys.getByUserId(getIdFromObj(user))}
        filter={{ type: 'Currency' }}
        columns={columns}
        actions={Actions}
        method='GET'
        actionHeader='Actions'
        noHeader={isTablet}
      >
        {isTablet
          ? (props: TableViewRendererProps<ConvertedAssetBalance>) => (
              <CompactTable
                {...props}
                columns={compactColumns}
                menu={
                  <MobileMenu
                    items={props.items}
                    titleExtractor={titleExtractor}
                    actions={(item: ConvertedAssetBalance) => (
                      <MobileActions item={item} />
                    )}
                  />
                }
              />
            )
          : undefined}
      </TableView>
    </ActiveElementContextWrapper>
  )
}
