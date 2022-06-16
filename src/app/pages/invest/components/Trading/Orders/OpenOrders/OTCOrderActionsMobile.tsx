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

export const OTCOrderActionsMobile = ({ item, type }: OTCOrderActionsProps) => {
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

// import { Box } from '@mui/material'
// import { CancelOTCOrderButton } from 'app/pages/invest/components/Trading/Orders/OpenOrders/CancelOTCOrderButton'
// import { capitalizeFirstLetter } from 'helpers/strings'
// import React from 'react'
// import {
//   ColumnOTCMatch,
//   OpenOTCOrder,
//   OTCOrder,
//   OTCOrderStatus
// } from 'types/otcOrder'
// import { ConfirmOTCOrderButton } from './ConfirmOTCOrderButton'
// import { DropDownOTCRow } from './DropDownOTCRow'

// export interface OTCOrderActionsProps {
//   item: OpenOTCOrder
// }
// export interface ConfirmOrderActionsProps {
//   item: ColumnOTCMatch
// }
// export const OTCOrderActions = ({ item }: OTCOrderActionsProps) => {
//   const orderFinished = [
//     OTCOrderStatus.COMPLETED,
//     OTCOrderStatus.CANCELLED,
//     OTCOrderStatus.PENDING
//   ].includes(item?.status as any)
//   const showCancel = !orderFinished
//   const showDropdown = Number(item?.matches?.length) > 0
//   return (
//     <Box display='flex' justifyContent='space-between'>
//       {showCancel && <CancelOTCOrderButton variant='text' order={item} />}
//       {!showCancel && (
//         <Box textAlign={'left'}>
//           {capitalizeFirstLetter(item?.status ?? '')}
//         </Box>
//       )}
//       {showDropdown && <DropDownOTCRow order={item} />}
//     </Box>
//   )
// }

// export const ConfirmOTCOrderActions = ({ item }: ConfirmOrderActionsProps) => {
//   const showConfirm =
//     item?.status === OTCOrderStatus.CONFIRMED && item.orderType === 'SELL'
//   return (
//     <>{showConfirm && <ConfirmOTCOrderButton variant='text' order={item} />}</>
//   )
// }
