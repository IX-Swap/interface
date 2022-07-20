import React from 'react'
import { useBalancesByAssetId } from 'hooks/balance/useBalancesByAssetId'
import { formatMoney } from 'helpers/numbers'
import { OverviewValue } from 'app/pages/invest/components/MakeCommitment/OverviewValue'

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
    <OverviewValue
      label='Available Balance'
      value={formatMoney(
        data.map[assetId]?.available ?? 0,
        data.map[assetId]?.symbol ?? symbol
      )}
    />
  )
}
