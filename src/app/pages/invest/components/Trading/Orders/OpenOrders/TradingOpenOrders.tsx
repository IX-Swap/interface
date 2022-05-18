import { Grid } from '@mui/material'
import {
  columns,
  compactColumns
} from 'app/pages/invest/components/Trading/Orders/OpenOrders/columns'
import { OTCOrderActions } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OTCOrderActions'
import { CompactBody } from 'components/TableWithPagination/CompactBody'
import {
  TableView,
  TableViewRendererProps
} from 'components/TableWithPagination/TableView'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { useParams } from 'react-router-dom'
import { OTCOrder } from 'types/otcOrder'
import { orders } from '__fixtures__/otcOrders'

export const TradingOpenOrders = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { pairId } = useParams<{ pairId: string }>()
  const { isMiniLaptop } = useAppBreakpoints()

  return (
    <Grid>
      <TableView<OTCOrder>
        name={tradingQueryKeys.getMyOpenOrdersList(userId, pairId)}
        uri={trading.getMyOrdersList}
        fakeItems={orders}
        size='small'
        // filter={
        //   {
        //     orderType: 'OPEN'
        //   } as any
        // }
        columns={columns}
        noHeader={isMiniLaptop}
        themeVariant={'primary'}
        hasActions
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
          ? (props: TableViewRendererProps<OTCOrder>) => (
              <CompactBody {...props} columns={compactColumns} />
            )
          : undefined}
      </TableView>
    </Grid>
  )
}
