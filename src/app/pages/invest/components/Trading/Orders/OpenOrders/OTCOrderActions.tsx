import { Box } from '@mui/material'
import { CancelOTCOrderButton } from 'app/pages/invest/components/Trading/Orders/OpenOrders/CancelOTCOrderButton'
import React from 'react'
import { OTCOrder, OTCOrderStatus } from 'types/otcOrder'
import { ConfirmOTCOrderButton } from './ConfirmOTCOrderButton'

export interface OTCOrderActionsProps {
  item: OTCOrder
}

export const OTCOrderActions = ({ item }: OTCOrderActionsProps) => {
  const showButtons =
    item.status === OTCOrderStatus.MATCH && item.orderType === 'SELL'
  if (!showButtons) {
    return <></>
  }
  return (
    <Box display='flex' justifyContent='space-between'>
      <CancelOTCOrderButton variant='text' order={item} />
      <ConfirmOTCOrderButton variant='text' order={item} />
    </Box>
  )
}
