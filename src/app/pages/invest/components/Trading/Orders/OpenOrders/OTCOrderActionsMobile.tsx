import { Box } from '@mui/material'
import { CancelOTCOrderButton } from 'app/pages/invest/components/Trading/Orders/OpenOrders/CancelOTCOrderButton'
import { capitalizeFirstLetter } from 'helpers/strings'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { OpenOTCOrder, OTCOrderStatus } from 'types/otcOrder'

export interface OTCOrderActionsProps {
  item: OpenOTCOrder
  type: 'Cancel' | 'Confirm'
}
// const showConfirm =
//     item?.status === OTCOrderStatus.CONFIRMED && item.orderType === 'SELL'

export const OTCOrderActionsMobile = ({ item }: OTCOrderActionsProps) => {
  const orderFinished = [
    OTCOrderStatus.COMPLETED,
    OTCOrderStatus.CANCELLED,
    OTCOrderStatus.PENDING
  ].includes(item?.status as any)
  const showCancel = !orderFinished
  const { isMiniLaptop } = useAppBreakpoints()
  if (!isMiniLaptop) {
    return null
  }
  if (!showCancel) {
    return (
      <Box textAlign={'left'}>{capitalizeFirstLetter(item?.status ?? '')}</Box>
    )
  }
  if (showCancel) {
    return <CancelOTCOrderButton variant='text' order={item} />
  }
  return null
}
