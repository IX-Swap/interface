import { Box, Button, ButtonProps, CircularProgress } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/ConfirmOTCOrderButton.styles'
import { useConfirmMyOrder } from 'app/pages/invest/hooks/useConfirmMyOrder'
import { usePairTokenAddressNetwork } from 'app/pages/invest/hooks/usePairTokenAddressNetwork'
import { useSendToken } from 'app/pages/invest/hooks/useSendToken'
import {
  CONGESTION_START_TIME,
  useTransactionTimer
} from 'app/pages/invest/hooks/useTransactionTimer'
import { LeavePageContext } from 'app/pages/issuance/context/LeavePageContext'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React, { useContext, useEffect, useState } from 'react'
import { ColumnOTCMatch } from 'types/otcOrder'
export interface ConfirmOTCOrderButtonProps extends ButtonProps {
  order: ColumnOTCMatch
}

export const ConfirmOTCOrderButton = ({
  order,
  ...rest
}: ConfirmOTCOrderButtonProps) => {
  const { chainId, address } = usePairTokenAddressNetwork()
  const [loadingTransaction, setLoadingTransaction] = useState(false)
  const context = useContext(LeavePageContext)
  const classes = useStyles()

  const sendCallback = async () => {
    await confirmMatch({
      orderId: order.parentOrder,
      matchedOrderId: order.matchedOrder?._id ?? ''
    })
    setStartedTimer(true)
  }

  const [confirmMatch, { isLoading }] = useConfirmMyOrder()
  const { seconds, setStartedTimer } = useTransactionTimer()

  useEffect(() => {
    if (seconds >= CONGESTION_START_TIME && context?.showCongested === false) {
      context?.openCongested()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, context?.showCongested])

  const sendToken = useSendToken({
    address: address,
    tokenChainId: chainId,
    amount: order.matchedAmount ?? 0,
    recipient: order.ethAddress,
    callback: sendCallback
  })
  const handleClick = async () => {
    setLoadingTransaction(true)
    try {
      context?.openPrompt()
      await sendToken()
    } catch {
      console.error('error confirming')
    } finally {
      setStartedTimer(false)
      context?.hideCongested()
      context?.closePrompt()
      setLoadingTransaction(false)
    }
  }

  const { isTablet } = useAppBreakpoints()

  return (
    <>
      {(isLoading || loadingTransaction) && (
        <Box className={classes.loader} data-testid='loader'>
          <CircularProgress size={14} />
        </Box>
      )}
      {!(isLoading || loadingTransaction) && (
        <Box display='flex' alignItems={'center'} minWidth={'100%'}>
          {!isTablet && (
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
          {isTablet && (
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
