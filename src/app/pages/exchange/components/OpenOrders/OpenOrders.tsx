import React from 'react'
import { Grid } from '@material-ui/core'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/exchange/components/OpenOrders/columns'

export const OpenOrders = () => {
  return (
    <Grid>
      <TableView
        name='open-orders'
        uri='_'
        columns={columns}
        fakeItems={[
          {
            createdAt: new Date(Date.now()).toDateString(),
            side: 'Buy',
            tif: 'ATO',
            price: 90000,
            amount: 30,
            total: 2700000,
            filled: 0.04
          }
        ]}
      />
    </Grid>
  )
}
