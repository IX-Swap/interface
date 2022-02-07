import React from 'react'
import { Grid } from '@mui/material'
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
import { useParams } from 'react-router-dom'
import { exchangeMarket } from 'config/apiURL'
import { exchangeMarketQueryKeys } from 'config/queryKeys'
import { Order } from 'types/order'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { CompactBody } from 'components/TableWithPagination/CompactBody'
import { OrderActions } from 'app/pages/exchange/components/OpenOrders/OrderActions'

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
        noHeader={isMiniLaptop}
        themeVariant={'primary'}
        hasActions
        actions={OrderActions}
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
              <CompactBody {...props} columns={compactColumns} />
            )
          : undefined}
      </TableView>
    </Grid>
  )
}
