import { Grid, Typography, useTheme } from '@material-ui/core'
import React from 'react'
import { Order } from 'types/order'
import { TableColumn } from 'types/util'
import get from 'lodash/get'
import { Actions } from 'app/pages/authorizer/components/Actions'
import { CancelOrderButton } from 'app/pages/exchange/components/OpenOrders/CancelOrderButton'

export interface OrderDisplay {
  data: Order
  columns: Array<TableColumn<Order, string>>
  actions?: Actions<Order>
}

export const OrderDisplay = ({ data, columns }: OrderDisplay) => {
  const theme = useTheme()
  return (
    <Grid container spacing={1} style={{ marginTop: 16, marginBottom: 16 }}>
      <Grid item xs={6}>
        <Typography variant='subtitle1'>{data.pair}</Typography>
      </Grid>
      {data.status === 'OPEN' ? (
        <Grid item xs={6} container justify='flex-end'>
          <CancelOrderButton
            variant='contained'
            disableElevation
            style={{
              backgroundColor: '#EDE7FF',
              borderRadius: 0,
              padding: 0,
              height: 22,
              textTransform: 'capitalize',
              color: theme.palette.primary.main
            }}
            order={data}
          />
        </Grid>
      ) : (
        <Grid item xs={6} />
      )}

      {columns.map(({ label, key, render }) => (
        <React.Fragment key={key}>
          <Grid item xs={6}>
            {label}
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            {key.length > 0 &&
              (typeof render === 'function'
                ? render(get(data, key), data)
                : get(data, key))}
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  )
}
