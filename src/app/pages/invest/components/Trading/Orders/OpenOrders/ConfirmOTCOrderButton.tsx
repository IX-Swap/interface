import { Box, Button, ButtonProps, CircularProgress } from '@mui/material'
import { useConfirmMyOrder } from 'app/pages/authorizer/hooks/useConfirmMyOrder'
import { usePairTokenAddressNetwork } from 'app/pages/invest/hooks/usePairTokenAddressNetwork'
import { useSendToken } from 'app/pages/invest/hooks/useSendToken'
import React, { useState } from 'react'
import { OTCOrder } from 'types/otcOrder'
export interface ConfirmOTCOrderButtonProps extends ButtonProps {
  order: OTCOrder
}
export const ConfirmOTCOrderButton = ({
  order,
  ...rest
}: ConfirmOTCOrderButtonProps) => {
  const { chainId, address } = usePairTokenAddressNetwork()
  const [loadingTransaction, setLoadingTransaction] = useState(false)
  const sendToken = useSendToken({
    address: address,
    tokenChainId: chainId
  })
  const [confirmMatch, { isLoading }] = useConfirmMyOrder()
  const handleClick = async () => {
    setLoadingTransaction(true)
    try {
      await sendToken(order.amount, order.matches?.ethAddress)
      await confirmMatch({
        orderId: order._id,
        matchedOrderId: order.matches?.order ?? ''
      })
    } catch {
      console.error('error confirming')
    } finally {
      setLoadingTransaction(false)
    }
  }

  return (
    <Box display='flex' justifyContent='center' alignItems={'center'}>
      {(isLoading || loadingTransaction) && <CircularProgress size={14} />}
      {!(isLoading || loadingTransaction) && (
        <Button
          disabled={isLoading || loadingTransaction}
          onClick={handleClick}
          variant='text'
          color='primary'
          size='small'
          {...rest}
        >
          Confirm
        </Button>
      )}
    </Box>
  )
}
