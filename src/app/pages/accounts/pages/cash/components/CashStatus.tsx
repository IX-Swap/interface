import React from 'react'
import { ConvertedAssetBalance } from 'types/balance'
import { ExpandButton } from 'ui/CompactTable/ExpandButton'
import { Status } from 'ui/Status/Status'

export interface CashStatusProps {
  item: ConvertedAssetBalance
}
export const renderActionButton = (item: ConvertedAssetBalance) => {
  if (item.status !== 'Approved') {
    return <CashStatus item={item} />
  }
  return <ExpandButton item={item} />
}
export const CashStatus = ({ item }: CashStatusProps) => {
  return (
    <Status
      label={item.status}
      type={item.status === 'Rejected' ? 'rejected' : 'draft'}
    />
  )
}
