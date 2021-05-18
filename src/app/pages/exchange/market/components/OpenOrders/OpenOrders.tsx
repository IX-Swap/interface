import React from 'react'
import { Grid } from '@material-ui/core'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/exchange/market/components/OpenOrders/columns'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'

export const OpenOrders = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <Grid>
      <TableView
        name='open-orders'
        uri={`exchange/orders/list/${userId}`}
        filter={
          {
            pair: '60a2340a804b8f3de6248b56'
          } as any
        }
        columns={columns}
      />
    </Grid>
  )
}
