import { ConvertedAssetBalance } from 'types/balance'
import { ExpandButton } from 'ui/CompactTable/ExpandButton'
import { CashStatus } from './CashStatus'
import React from 'react'

export const renderActionButton = (item: ConvertedAssetBalance) => {
  if (item.status !== 'Approved') {
    return <CashStatus item={item} />
  }
  return <ExpandButton item={item} />
}
