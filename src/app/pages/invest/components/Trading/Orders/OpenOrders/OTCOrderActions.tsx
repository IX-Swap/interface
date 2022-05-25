import { Box } from '@mui/material'
import { CancelOTCOrderButton } from 'app/pages/invest/components/Trading/Orders/OpenOrders/CancelOTCOrderButton'
import { capitalizeFirstLetter } from 'helpers/strings'
import React from 'react'
import { OTCOrder, OTCOrderStatus } from 'types/otcOrder'
import { ConfirmOTCOrderButton } from './ConfirmOTCOrderButton'

export interface OTCOrderActionsProps {
  item: OTCOrder
}

export const OTCOrderActions = ({ item }: OTCOrderActionsProps) => {
  const showConfirm =
    item?.matches?.status === OTCOrderStatus.CONFIRMED &&
    item.orderType === 'SELL'
  const orderFinished = [
    OTCOrderStatus.COMPLETED,
    OTCOrderStatus.CANCELLED,
    OTCOrderStatus.PENDING
  ].includes(item?.matches?.status as any)
  const showCancel = !orderFinished
  if (!(showCancel || showConfirm)) {
    return (
      <Box textAlign={'left'}>
        {capitalizeFirstLetter(item?.matches?.status ?? '')}
      </Box>
    )
  }

  return (
    <Box display='flex' justifyContent='space-between'>
      {showCancel && <CancelOTCOrderButton variant='text' order={item} />}
      {showConfirm && <ConfirmOTCOrderButton variant='text' order={item} />}
    </Box>
  )
}
