import React from 'react'
import { Box, Button } from '@material-ui/core'
import { useCancelOrder } from 'app/pages/exchange/hooks/useCancelOrder'
import { Order } from 'types/order'

export interface CancelOrderButtonProps {
  order: Order
}

export const CancelOrderButton = ({ order }: CancelOrderButtonProps) => {
  const [cancelOrder, { status }] = useCancelOrder(order._id)
  const handleClick = async () => {
    void cancelOrder({
      pair: order.pair,
      side: order.side,
      type: order.type,
      price: order.price,
      amount: order.amount
    })
  }

  return (
    <Box display='flex' justifyContent='center'>
      <Button
        disabled={status === 'loading'}
        onClick={handleClick}
        variant='text'
        color='primary'
        size='small'
      >
        Cancel
      </Button>
    </Box>
  )
}
