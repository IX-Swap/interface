import React from 'react'
import { useBalancesByAssetId } from 'v2/hooks/balance/useBalancesByAssetId'
import { LabelledValue } from 'v2/components/LabelledValue'
import { formatMoney } from 'v2/helpers/numbers'

export interface AssetBalanceProps {
  assetId: string
}

export const AssetBalance = (props: AssetBalanceProps) => {
  const { assetId } = props
  const { data, isLoading, isIdle } = useBalancesByAssetId(assetId)

  if (isLoading || isIdle) {
    return null
  }

  return (
    <LabelledValue
      label='Account Balance'
      value={formatMoney(
        data.map[assetId]?.available ?? 0,
        data.map[assetId]?.numberFormat.currency
      )}
    />
  )
}
