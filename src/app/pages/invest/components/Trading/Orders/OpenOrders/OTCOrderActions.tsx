import { Box } from '@mui/material'
import { CancelOTCOrderButton } from 'app/pages/invest/components/Trading/Orders/OpenOrders/CancelOTCOrderButton'
import { capitalizeFirstLetter } from 'helpers/strings'
import React from 'react'
import { ColumnOTCMatch, OpenOTCOrder, OTCOrderStatus } from 'types/otcOrder'
import { ConfirmOTCOrderButton } from './ConfirmOTCOrderButton'
import { DropDownOTCRow } from './DropDownOTCRow'

export interface OTCOrderActionsProps {
  item: OpenOTCOrder
}
export interface ConfirmOrderActionsProps {
  item: ColumnOTCMatch
}
export const OTCOrderActions = ({ item }: OTCOrderActionsProps) => {
  const orderFinished = [
    OTCOrderStatus.COMPLETED,
    OTCOrderStatus.CANCELLED,
    OTCOrderStatus.PENDING
  ].includes(item?.status as any)
  const showCancel = !orderFinished
  const showDropdown =
    Number(item?.matches?.length) > 0 && item.orderType === 'SELL'
  return (
    <Box display='flex' justifyContent='space-between'>
      {showCancel && <CancelOTCOrderButton variant='text' order={item} />}
      {!showCancel && (
        <Box textAlign={'left'}>
          {capitalizeFirstLetter(item?.status ?? '')}
        </Box>
      )}
      {showDropdown && <DropDownOTCRow order={item} />}
    </Box>
  )
}

export const ConfirmOTCOrderActions = ({ item }: ConfirmOrderActionsProps) => {
  const showConfirm = item?.status === OTCOrderStatus.CONFIRMED
  return (
    <Box display='flex' justifyContent='space-between'>
      {showConfirm && <ConfirmOTCOrderButton variant='text' order={item} />}
      {!showConfirm && (
        <Box textAlign={'center'} pl={1.25}>
          {capitalizeFirstLetter(item?.status ?? '')}
        </Box>
      )}
    </Box>
  )
}
