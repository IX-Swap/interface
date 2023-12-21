import React from 'react'
import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'
import {
  columns,
  compactColumns
} from 'app/pages/accounts/pages/cash/components/columns'
import { Actions } from './Actions'
import { MobileActions } from './MobileActions'
import { virtualAccounts } from 'config/apiURL'
import { balanceQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { ConvertedAssetBalance } from 'types/balance'
import { CompactTable } from 'ui/CompactTable/CompactTable'
import { MobileMenu } from 'ui/CompactTable/MobileMenu'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { renderActionButton } from '../renderActionbutton'
import { NoData } from '../../../banks/pages/BanksList/NoData'

export const StableCoinsTable: React.FC = () => {
  const { user } = useAuth()
  const { isTablet } = useAppBreakpoints()
  const titleExtractor = (item: ConvertedAssetBalance) => {
    return item.currency
  }
  return (
    <ActiveElementContextWrapper>
      <TableView<ConvertedAssetBalance>
        uri={virtualAccounts.getByUserId(getIdFromObj(user), 'Stablecoin')}
        name={balanceQueryKeys.getByUserId(getIdFromObj(user))}
        filter={{ type: 'Stablecoin' }}
        columns={columns.slice(0, -1)}
        actions={Actions}
        method='GET'
        actionHeader='Actions'
        paginationPlacement='none'
        noHeader={isTablet}
        noDataComponent={<NoData accountType='cash' />}
      >
        {isTablet
          ? (props: TableViewRendererProps<ConvertedAssetBalance>) => (
              <CompactTable
                {...props}
                columns={compactColumns.slice(0, -1)}
                renderActionButton={renderActionButton}
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
