import React from 'react'
import { Typography } from '@material-ui/core'
import { Order } from 'types/order'

interface OrderStatusProps {
  status: Order['status']
}

export const OrderStatus = ({ status }: OrderStatusProps) => {
  return (
    <Typography color={status === 'CANCELLED' ? 'error' : 'initial'}>
      {status[0].toLocaleUpperCase() +
        status.slice(1, status.length).toLowerCase()}
    </Typography>
  )
}
