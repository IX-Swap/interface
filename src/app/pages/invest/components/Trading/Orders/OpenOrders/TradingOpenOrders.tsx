import {
  columns,
  compactColumns
} from 'app/pages/invest/components/Trading/Orders/OpenOrders/columns'
import { OTCOrderActions } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OTCOrderActions'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useActiveWeb3React } from 'hooks/blockchain/web3'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { useParams } from 'react-router-dom'
import { LeavePageContextWrapper } from 'app/pages/issuance/context/LeavePageContext'
import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'
import { Listing } from 'types/listing'
import { CompactTable } from 'ui/CompactTable/CompactTable'
import { MobileMenu } from 'ui/CompactTable/MobileMenu'
import { MobileActions } from 'app/pages/issuance/components/SecondaryListingsTable/MobileActions'

export const TradingOpenOrders = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { pairId } = useParams<{ pairId: string }>()
  const { isTablet } = useAppBreakpoints()
  const { account } = useActiveWeb3React()

  return (
    <LeavePageContextWrapper>
      <ActiveElementContextWrapper>
        <TableView<Listing>
          name={tradingQueryKeys.getMyOpenOrdersList(userId, pairId, account)}
          uri={trading.getMyOrdersList(account)}
          columns={columns}
          size='small'
          defaultRowsPerPage={5}
          noHeader={isTablet}
          actions={OTCOrderActions}
        >
          {isTablet
            ? (props: TableViewRendererProps<any>) => (
                <CompactTable
                  {...props}
                  columns={compactColumns}
                  menu={
                    <MobileMenu
                      items={props.items}
                      actions={(item: Listing) => <MobileActions item={item} />}
                      titleExtractor={function (item: Listing): string {
                        throw new Error('Function not implemented.')
                      }}
                    />
                  }
                />
              )
            : undefined}
        </TableView>
      </ActiveElementContextWrapper>
    </LeavePageContextWrapper>
  )
}
