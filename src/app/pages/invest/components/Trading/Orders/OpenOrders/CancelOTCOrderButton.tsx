import React from 'react'
import { Box, Button, ButtonProps, CircularProgress } from '@mui/material'
import { OTCOrder } from 'types/otcOrder'
import { useCancelOTCOrder } from 'app/pages/invest/hooks/useCancelOTCOrder'

export interface CancelOTCOrderButtonProps extends ButtonProps {
  order: OTCOrder
}

export const CancelOTCOrderButton = ({
  order,
  ...rest
}: CancelOTCOrderButtonProps) => {
  const [cancelOrder, { status }] = useCancelOTCOrder(
    order._id,
    order.orderType
  )
  const handleClick = async () => {
    void cancelOrder()
  }

  return (
    <Box display='flex' justifyContent='center' alignItems={'center'}>
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
