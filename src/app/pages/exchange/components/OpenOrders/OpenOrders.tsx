import React from 'react'
import { Grid } from '@material-ui/core'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/exchange/components/OpenOrders/columns'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { useParams } from 'react-router'
import { exchangeMarket } from 'config/apiURL'
import { exchangeMarketQueryKeys } from 'config/queryKeys'
import { Order } from 'types/order'

export const OpenOrders = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { pairId } = useParams<{ pairId: string }>()

  return (
    <Grid>
      <TableView<Order>
        name={exchangeMarketQueryKeys.getOrdersList(userId, pairId)}
        uri={exchangeMarket.getOrdersList(userId)}
        size='small'
        filter={
          {
            pair: pairId,
            status: 'OPEN'
          } as any
        }
        columns={columns}
      />
    </Grid>
  )
}
