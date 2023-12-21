import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'
import { Actions } from 'app/pages/accounts/pages/cash/components/Actions'
import {
  columns,
  compactColumns
} from 'app/pages/accounts/pages/cash/components/columns'
import { MobileActions } from 'app/pages/accounts/pages/cash/components/MobileActions'
import { virtualAccounts } from 'config/apiURL'
import { balanceQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { ConvertedAssetBalance } from 'types/balance'
import { CompactTable } from 'ui/CompactTable/CompactTable'
import { MobileMenu } from 'ui/CompactTable/MobileMenu'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { renderActionButton } from './renderActionbutton'
import { NoData } from '../../banks/pages/BanksList/NoData'
import { AddBankAccountButton } from '../../withdraw/components/AddBankAccountButton'

export const CashTable: React.FC = () => {
  const { user } = useAuth()
  const { isTablet } = useAppBreakpoints()
  const titleExtractor = (item: ConvertedAssetBalance) => {
    return item.currency
  }
  return (
    <ActiveElementContextWrapper>
      <TableView<ConvertedAssetBalance>
        uri={virtualAccounts.getByUserId(getIdFromObj(user), 'Currency')}
        name={balanceQueryKeys.getByUserId(getIdFromObj(user))}
        filter={{ type: 'Currency' }}
        columns={columns}
        actions={Actions}
        method='GET'
        actionHeader='Actions'
        paginationPlacement='none'
        noHeader={isTablet}
        noDataComponent={
          <NoData accountType='cash'>
            <AddBankAccountButton variant='contained' />
          </NoData>
        }
      >
        {isTablet
          ? (props: TableViewRendererProps<ConvertedAssetBalance>) => (
              <CompactTable
                {...props}
                columns={compactColumns}
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
