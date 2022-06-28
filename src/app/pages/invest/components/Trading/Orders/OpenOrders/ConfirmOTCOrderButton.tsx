import { Box, Button, ButtonProps, CircularProgress } from '@mui/material'
import { useConfirmMyOrder } from 'app/pages/invest/hooks/useConfirmMyOrder'
import { usePairTokenAddressNetwork } from 'app/pages/invest/hooks/usePairTokenAddressNetwork'
import { useSendToken } from 'app/pages/invest/hooks/useSendToken'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React, { useState } from 'react'
import { ColumnOTCMatch } from 'types/otcOrder'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/ConfirmOTCOrderButton.styles'
import { LeavePagePrompt } from 'components/LeavePagePrompt/LeavePagePrompt'
export interface ConfirmOTCOrderButtonProps extends ButtonProps {
  order: ColumnOTCMatch
}
export const ConfirmOTCOrderButton = ({
  order,
  ...rest
}: ConfirmOTCOrderButtonProps) => {
  const { chainId, address } = usePairTokenAddressNetwork()
  const [loadingTransaction, setLoadingTransaction] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const classes = useStyles()
  const sendCallback = async () => {
    await confirmMatch({
      orderId: order.parentOrder,
      matchedOrderId: order.matchedOrder?._id ?? ''
    })
  }
  const sendToken = useSendToken({
    address: address,
    tokenChainId: chainId,
    amount: order.matchedAmount ?? 0,
    recipient: order.ethAddress,
    callback: sendCallback
  })
  const [confirmMatch, { isLoading }] = useConfirmMyOrder()

  const handleClick = async () => {
    setLoadingTransaction(true)
    try {
      setShowPrompt(true)
      await sendToken()
    } catch {
      console.error('error confirming')
    } finally {
      setShowPrompt(false)
      setLoadingTransaction(false)
    }
  }
  const { isMiniLaptop } = useAppBreakpoints()

  return (
    <>
      <LeavePagePrompt showPrompt={showPrompt} />
      {(isLoading || loadingTransaction) && (
        <Box className={classes.loader} data-testid='loader'>
          <CircularProgress size={14} />
        </Box>
      )}
      {!(isLoading || loadingTransaction) && (
        <Box display='flex' alignItems={'center'} minWidth={'100%'}>
          {!isMiniLaptop && (
            <Button
              disabled={isLoading || loadingTransaction}
              onClick={handleClick}
              color='primary'
              data-testid='confirmButton'
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
              variant='outlined'
              color='primary'
              data-testid='confirmButtonMobile'
              fullWidth
              className={classes.buttonMobile}
            >
              Confirm
            </Button>
          )}
        </Box>
      )}
    </>
  )
}
