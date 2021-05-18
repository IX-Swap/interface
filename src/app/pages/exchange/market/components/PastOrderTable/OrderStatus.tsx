import React from 'react'
import { Typography } from '@material-ui/core'
import { Order } from 'types/order'

interface OrderStatusProps {
  status: Order['status']
}

export const OrderStatus = ({ status }: OrderStatusProps) => {
  return (
    <Typography color={status === 'Canceled' ? 'error' : 'primary'}>
      {status}
    </Typography>
  )
}
