import { Grid } from '@mui/material'
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
import { OpenOTCOrder } from 'types/otcOrder'
import { CompactOpenOTCOrder } from './CompactOpenOTCOrder'
import { OpenOrdersEmptyState } from './OpenOrdersEmptyState'
import { OpenOTCTableBody } from './OpenOTCTableBody'
import { LeavePageContextWrapper } from 'app/pages/issuance/context/LeavePageContext'
import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const TradingOpenOrders = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { pairId } = useParams<{ pairId: string }>()
  const { isTablet } = useAppBreakpoints()
  const { account } = useActiveWeb3React()
  const { getFilterValue } = useQueryFilter()
  const filter = {
    searchKeyword: getFilterValue('search'),
    sortField: getFilterValue('sortBy'),
    sortOrder: getFilterValue('orderBy') === 'ASC' ? 1 : -1
  }
  return (
    <LeavePageContextWrapper>
      <ActiveElementContextWrapper>
        <Grid>
          <TableView<OpenOTCOrder>
            name={tradingQueryKeys.getMyOpenOrdersList(userId, pairId, account)}
            uri={trading.getMyOrdersList(account)}
            size='small'
            columns={columns}
            actionHeader={'Actions'}
            noHeader={isTablet}
            filter={
              {
                ...filter,
                status: 'Pending,Matched,Filled' as any
              } as any
            }
            // themeVariant={'primary'}
            // hasActions
            bordered={false}
            noDataComponent={<OpenOrdersEmptyState />}
            actions={OTCOrderActions}
            paperProps={
              isTablet
                ? {
                    variant: 'elevation',
                    elevation: 0
                  }
                : undefined
            }
          >
            {isTablet
              ? (props: TableViewRendererProps<OpenOTCOrder>) => (
                  <CompactOpenOTCOrder {...props} columns={compactColumns} />
                )
              : (props: TableViewRendererProps<OpenOTCOrder>) => (
                  <OpenOTCTableBody {...props} columns={columns} />
                )}
          </TableView>
        </Grid>
      </ActiveElementContextWrapper>
    </LeavePageContextWrapper>
  )
}
