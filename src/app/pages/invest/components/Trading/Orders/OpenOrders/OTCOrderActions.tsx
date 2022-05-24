import { Box } from '@mui/material'
import { CancelOTCOrderButton } from 'app/pages/invest/components/Trading/Orders/OpenOrders/CancelOTCOrderButton'
import React from 'react'
import { OTCOrder, OTCOrderStatus } from 'types/otcOrder'
import { ConfirmOTCOrderButton } from './ConfirmOTCOrderButton'

export interface OTCOrderActionsProps {
  item: OTCOrder
}

export const OTCOrderActions = ({ item }: OTCOrderActionsProps) => {
  const showConfirm =
    item.status === OTCOrderStatus.CONFIRMED && item.orderType === 'SELL'
  const orderFinished = [
    OTCOrderStatus.COMPLETED,
    OTCOrderStatus.CANCELLED
  ].includes(item.status)
  const showCancel = !orderFinished
  if (!(showConfirm || showCancel)) {
    return <></>
  }
  return (
    <Box display='flex' justifyContent='space-between'>
      {showCancel && <CancelOTCOrderButton variant='text' order={item} />}
      {showConfirm && <ConfirmOTCOrderButton variant='text' order={item} />}
    </Box>
  )
}
