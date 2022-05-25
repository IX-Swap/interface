import { Box, Button, ButtonProps } from '@mui/material'
import { useConfirmMyOrder } from 'app/pages/authorizer/hooks/useConfirmMyOrder'
import { usePairTokenAddressNetwork } from 'app/pages/invest/hooks/usePairTokenAddressNetwork'
import { useSendToken } from 'app/pages/invest/hooks/useSendToken'
import React from 'react'
import { OTCOrder } from 'types/otcOrder'

export interface ConfirmOTCOrderButtonProps extends ButtonProps {
  order: OTCOrder
}
export const ConfirmOTCOrderButton = ({
  order,
  ...rest
}: ConfirmOTCOrderButtonProps) => {
  const { chainId, address } = usePairTokenAddressNetwork()
  const sendToken = useSendToken({
    address: address,
    tokenChainId: chainId
  })
  const [confirmMatch, { isLoading }] = useConfirmMyOrder()
  const handleClick = async () => {
    try {
      await sendToken(order.ethAddress, order.amount)
      await confirmMatch({
        orderId: order._id,
        matchedOrderId: order.matches?._id ?? ''
      })
    } catch {
      console.error('error confirming')
    }
  }

  return (
    <Box display='flex' justifyContent='center'>
      <Button
        disabled={isLoading}
        onClick={handleClick}
        variant='text'
        color='primary'
        size='small'
        {...rest}
      >
        Confirm
      </Button>
    </Box>
  )
}
