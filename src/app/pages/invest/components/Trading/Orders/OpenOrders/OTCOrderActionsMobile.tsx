import { Box } from '@mui/material'
import { CancelOTCOrderButton } from 'app/pages/invest/components/Trading/Orders/OpenOrders/CancelOTCOrderButton'
import { capitalizeFirstLetter } from 'helpers/strings'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { OTCOrder, OTCOrderStatus } from 'types/otcOrder'
import { ConfirmOTCOrderButton } from './ConfirmOTCOrderButton'

export interface OTCOrderActionsProps {
  item: OTCOrder
  type: 'Cancel' | 'Confirm'
}

export const OTCOrderActionsMobile = ({ item, type }: OTCOrderActionsProps) => {
  const showConfirm =
    item?.matches?.status === OTCOrderStatus.CONFIRMED &&
    item.orderType === 'SELL'
  const orderFinished = [
    OTCOrderStatus.COMPLETED,
    OTCOrderStatus.CANCELLED,
    OTCOrderStatus.PENDING
  ].includes(item?.matches?.status as any)
  const showCancel = !orderFinished
  const { isMiniLaptop } = useAppBreakpoints()
  if (!isMiniLaptop) {
    return null
  }
  if (!(showCancel || showConfirm) && type === 'Cancel') {
    return (
      <Box textAlign={'left'}>
        {capitalizeFirstLetter(item?.matches?.status ?? '')}
      </Box>
    )
  }
  if (showCancel && type === 'Cancel') {
    return <CancelOTCOrderButton variant='text' order={item} />
  }
  if (showConfirm && type !== 'Cancel') {
    return <ConfirmOTCOrderButton order={item} />
  }
  return null
}
