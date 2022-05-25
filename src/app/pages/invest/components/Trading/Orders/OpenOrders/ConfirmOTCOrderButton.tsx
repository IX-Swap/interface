import { Box, Button, ButtonProps } from '@mui/material'
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
  const handleClick = async () => {
    await sendToken(order.ethAddress, order.amount)
  }

  return (
    <Box display='flex' justifyContent='center'>
      <Button
        // disabled={status === 'loading'}
        disabled={false}
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
