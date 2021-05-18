import React from 'react'
import { Box, Button } from '@material-ui/core'
import { Order } from 'app/pages/exchange/market/components/OpenOrders/columns'

export interface CancelOrderButtonProps {
  order: Order
}

export const CancelOrderButton = ({ order }: CancelOrderButtonProps) => {
  const handleClick = () => {
    console.log(order) // cancel order logic
  }

  return (
    <Box display='flex' justifyContent='center'>
      <Button onClick={handleClick} variant='text' color='primary'>
        Cancel
      </Button>
    </Box>
  )
}
