import React from 'react'
import { ConvertedAssetBalance } from 'types/balance'
import { Status } from 'ui/Status/Status'

export interface CashStatusProps {
  item: ConvertedAssetBalance
}

export const CashStatus = ({ item }: CashStatusProps) => {
  return (
    <Status
      label={item.status}
      type={item.status === 'Rejected' ? 'rejected' : 'draft'}
    />
  )
}
