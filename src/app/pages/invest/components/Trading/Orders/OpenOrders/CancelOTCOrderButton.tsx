import { Box, Button, ButtonProps, CircularProgress } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/CancelOTCOrder.styles'
import { useCancelOTCOrder } from 'app/pages/invest/hooks/useCancelOTCOrder'
import React from 'react'
import { OpenOTCOrder } from 'types/otcOrder'
export interface CancelOTCOrderButtonProps extends ButtonProps {
  order: OpenOTCOrder
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
    <>
      {status === 'loading' && (
        <Box display='flex' justifyContent='center' alignItems={'center'}>
          <CircularProgress size={14} />
        </Box>
      )}
      {status !== 'loading' && (
        <Box
          display='flex'
          justifyContent='center'
          alignItems={'center'}
          className={classes.button}
        >
          <Button
            onClick={handleClick}
            variant='text'
            color='primary'
            size='small'
            {...rest}
          >
            Cancel
          </Button>
        </Box>
      )}
    </>
  )
}
