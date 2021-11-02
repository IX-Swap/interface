import React from 'react'
import { Grid } from '@material-ui/core'
import {
  TableView,
  TableViewRendererProps
} from 'components/TableWithPagination/TableView'
import {
  columns,
  compactColumns
} from 'app/pages/exchange/components/OpenOrders/columns'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { useParams } from 'react-router'
import { exchangeMarket } from 'config/apiURL'
import { exchangeMarketQueryKeys } from 'config/queryKeys'
import { Order } from 'types/order'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { CompactBody } from 'components/TableWithPagination/CompactBody'
import { CompactRowProps } from 'components/TableWithPagination/CompactRow'
import { OrderDisplay } from 'app/pages/exchange/components/OpenOrders/OrderDisplay'

export const OpenOrders = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { pairId } = useParams<{ pairId: string }>()
  const { isMiniLaptop } = useAppBreakpoints()

  return (
    <Grid>
      <TableView<Order>
        name={exchangeMarketQueryKeys.getOrdersList(userId, pairId)}
        uri={exchangeMarket.getOrdersList(userId)}
        size='small'
        filter={
          {
            pair: pairId,
            orderType: 'OPEN'
          } as any
        }
        columns={columns}
        themeVariant={isMiniLaptop ? 'no-header' : 'primary'}
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
          ? (props: TableViewRendererProps<Order>) => (
              <CompactBody
                {...props}
                columns={compactColumns}
                renderRow={(props: CompactRowProps<Order>) => (
                  <OrderDisplay {...props} />
                )}
              />
            )
          : undefined}
      </TableView>
    </Grid>
  )
}
