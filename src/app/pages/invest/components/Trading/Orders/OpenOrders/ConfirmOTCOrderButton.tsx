import { Box, Button, ButtonProps, CircularProgress } from '@mui/material'
import { useConfirmMyOrder } from 'app/pages/invest/hooks/useConfirmMyOrder'
import { usePairTokenAddressNetwork } from 'app/pages/invest/hooks/usePairTokenAddressNetwork'
import { useSendToken } from 'app/pages/invest/hooks/useSendToken'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
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
  console.log({ address, chainId })
  const [confirmMatch, { isLoading }] = useConfirmMyOrder()
  const handleClick = async () => {
    setLoadingTransaction(true)
    try {
      console.log({
        amount: order.matches?.matchedAmount,
        address: order.matches?.ethAddress
      })
      const sendingResult = await sendToken(
        order.matches?.matchedAmount ?? 0,
        order.matches?.ethAddress
      )
      if (sendingResult) {
        await confirmMatch({
          orderId: order._id,

          matchedOrderId: order.matches?.order ?? ''
        })
      }
    } catch {
      console.error('error confirming')
    } finally {
      setLoadingTransaction(false)
    }
  }
  const { isMiniLaptop } = useAppBreakpoints()

  return (
    <Box display='flex' justifyContent='center' alignItems={'center'}>
      {(isLoading || loadingTransaction) && <CircularProgress size={14} />}
      {!(isLoading || loadingTransaction) && (
        <>
          {!isMiniLaptop && (
            <Button
              disabled={isLoading || loadingTransaction}
              onClick={handleClick}
              color='primary'
              size='small'
              {...rest}
            >
              Confirm
            </Button>
          )}
          {isMiniLaptop && (
            <Button
              disabled={isLoading || loadingTransaction}
              onClick={handleClick}
              variant='contained'
              color='primary'
              fullWidth
              {...rest}
            >
              Confirm
            </Button>
          )}
        </>
      )}
    </Box>
  )
}
