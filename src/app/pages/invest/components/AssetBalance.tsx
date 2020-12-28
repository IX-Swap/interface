import React from 'react'
import { useBalancesByAssetId } from 'hooks/balance/useBalancesByAssetId'
import { LabelledValue } from 'components/LabelledValue'
import { formatMoney } from 'helpers/numbers'

export interface AssetBalanceProps {
  assetId: string
  symbol: string
}

export const AssetBalance = (props: AssetBalanceProps) => {
  const { assetId, symbol } = props
  const { data, isLoading, isIdle } = useBalancesByAssetId(assetId)

  if (isLoading || isIdle) {
    return null
  }

  return (
    <LabelledValue
      label='Account Balance'
      value={formatMoney(
        data.map[assetId]?.available ?? 0,
        data.map[assetId]?.symbol ?? symbol
      )}
    />
  )
}
