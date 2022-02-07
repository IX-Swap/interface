import { useTheme } from '@mui/material'
import { CancelOrderButton } from 'app/pages/exchange/components/OpenOrders/CancelOrderButton'
import React from 'react'
import { Order } from 'types/order'

export interface OrderActionsProps {
  item: Order
}

export const OrderActions = ({ item }: OrderActionsProps) => {
  const theme = useTheme()

  return (
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
      order={item}
    />
  )
}
