import React from 'react'
import { Box, Button, ButtonProps } from '@mui/material'
import { OTCOrder } from 'types/otcOrder'
import { useCancelOTCOrder } from 'app/pages/invest/hooks/useCancelOTCOrder'

export interface CancelOTCOrderButtonProps extends ButtonProps {
  order: OTCOrder
}

export const CancelOTCOrderButton = ({
  order,
  ...rest
}: CancelOTCOrderButtonProps) => {
  const [cancelOrder, { status }] = useCancelOTCOrder(order._id)
  const handleClick = async () => {
    void cancelOrder()
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
