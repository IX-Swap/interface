import { Button, Typography } from '@material-ui/core'
import { Order } from 'app/pages/exchange/components/YourOrdersTable/YourOrderstable'
import { useCancelOrder } from 'app/pages/exchange/hooks/useCancelOrder'
import React from 'react'

export interface ActionsProps {
  item: Order
}

export const Actions = ({ item }: ActionsProps) => {
  const [cancelOrder] = useCancelOrder(item._id)
  const handleClick = async () => {
    void cancelOrder({
      pair: item.pair,
      side: item.side,
      type: item.type,
      price: item.price,
      amount: item.amount
    })
  }
  return (
    <>
      {item.status === 'Cancelled' ? (
        <Typography color='textSecondary'>CANCELLED</Typography>
      ) : (
        <Button onClick={handleClick}>
          <Typography color='error'>CANCEL</Typography>
        </Button>
      )}
    </>
  )
}
