import { Box } from '@mui/material'
import { CancelOTCOrderButton } from 'app/pages/invest/components/Trading/Orders/OpenOrders/CancelOTCOrderButton'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { OpenOTCOrder } from 'types/otcOrder'
import { renderOTCOrderStatus, showCancelButton } from './helpers'
export interface OTCOrderActionsProps {
  item: OpenOTCOrder
  type: 'Cancel' | 'Confirm'
}

export const OTCOrderActionsMobile = ({ item }: OTCOrderActionsProps) => {
  const showCancel = showCancelButton({ item })
  const { isMiniLaptop } = useAppBreakpoints()
  if (!isMiniLaptop) {
    return null
  }
  if (!showCancel) {
    return <Box textAlign={'left'}>{renderOTCOrderStatus({ item })}</Box>
  }
  if (showCancel) {
    return <CancelOTCOrderButton variant='text' order={item} />
  }
  return null
}
