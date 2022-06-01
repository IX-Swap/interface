import { Box, Button, ButtonProps, CircularProgress } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/CancelOTCOrder.styles'
import { useCancelOTCOrder } from 'app/pages/invest/hooks/useCancelOTCOrder'
import React from 'react'
import { OTCOrder } from 'types/otcOrder'
export interface CancelOTCOrderButtonProps extends ButtonProps {
  order: OTCOrder
}

export const CancelOTCOrderButton = ({
  order,
  ...rest
}: CancelOTCOrderButtonProps) => {
  const classes = useStyles()
  const [cancelOrder, { status }] = useCancelOTCOrder(
    order._id,
    order.orderType
  )
  const handleClick = async () => {
    void cancelOrder()
  }
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems={'center'}
      className={classes.button}
    >
      {status === 'loading' && <CircularProgress size={14} />}
      {status !== 'loading' && (
        <Button
          onClick={handleClick}
          variant='text'
          color='primary'
          size='small'
          {...rest}
        >
          Cancel
        </Button>
      )}
    </Box>
  )
}
