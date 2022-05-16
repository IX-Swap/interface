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
  const { chainId } = usePairTokenAddressNetwork()
  // TODO: replace with token address
  const sendToken = useSendToken({
    address: '0x91BC44e284Fe08Fe5A6550664F93Eca897930A82',
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
