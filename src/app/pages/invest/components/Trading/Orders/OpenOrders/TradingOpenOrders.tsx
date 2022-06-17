import { Grid } from '@mui/material'
import {
  columns,
  compactColumns
} from 'app/pages/invest/components/Trading/Orders/OpenOrders/columns'
import { OTCOrderActions } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OTCOrderActions'
import {
  TableView,
  TableViewRendererProps
} from 'components/TableWithPagination/TableView'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useActiveWeb3React } from 'hooks/blockchain/web3'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { useParams } from 'react-router-dom'
import { OpenOTCOrder } from 'types/otcOrder'
import { OpenOrdersContextWrapper } from '../../context/OpenOrdersContextWrapper'
import { CompactOpenOTCOrder } from './CompactOpenOTCOrder'
import { MobileNestedOrders } from './MobileNestedOrders'
import { OpenOrdersEmptyState } from './OpenOrdersEmptyState'
import { OpenOTCTableBody } from './OpenOTCTableBody'

export const TradingOpenOrders = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { pairId } = useParams<{ pairId: string }>()
  const { isMiniLaptop } = useAppBreakpoints()
  const { account } = useActiveWeb3React()
  return (
    <OpenOrdersContextWrapper>
      <Grid>
        <TableView<OpenOTCOrder>
          name={tradingQueryKeys.getMyOpenOrdersList(userId, pairId, account)}
          uri={trading.getMyOrdersList(account)}
          size='small'
          columns={columns}
          noHeader={isMiniLaptop}
          themeVariant={'primary'}
          hasActions
          bordered={false}
          noDataComponent={<OpenOrdersEmptyState />}
          actions={OTCOrderActions}
          paperProps={
            isMiniLaptop
              ? {
                  variant: 'elevation',
                  elevation: 0
                }
              : undefined
          }
        >
          {isMiniLaptop
            ? (props: TableViewRendererProps<OpenOTCOrder>) => (
                <CompactOpenOTCOrder {...props} columns={compactColumns} />
              )
            : (props: TableViewRendererProps<OpenOTCOrder>) => (
                <OpenOTCTableBody {...props} columns={columns} />
              )}
        </TableView>
        <MobileNestedOrders />
      </Grid>
    </OpenOrdersContextWrapper>
  )
}
