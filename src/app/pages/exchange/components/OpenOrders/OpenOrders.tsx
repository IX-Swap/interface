import React from 'react'
import { Grid } from '@material-ui/core'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/exchange/components/OpenOrders/columns'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { useParams } from 'react-router'

export const OpenOrders = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { pairId } = useParams<{ pairId: string }>()

  return (
    <Grid>
      <TableView
        name='open-orders'
        uri={`exchange/orders/list/${userId}`}
        size='small'
        filter={
          {
            pair: pairId
          } as any
        }
        columns={columns}
      />
    </Grid>
  )
}
