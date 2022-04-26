import React from 'react'
import { Box, Button, ButtonProps } from '@mui/material'
import { useCancelOrder } from 'app/pages/invest/hooks/useCancelOrder'
import { Order } from 'types/order'

export interface CancelOrderButtonProps extends ButtonProps {
  order: Order
}

export const CancelOrderButton = ({
  order,
  ...rest
}: CancelOrderButtonProps) => {
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
        {...rest}
      >
        Cancel
      </Button>
    </Box>
  )
}
