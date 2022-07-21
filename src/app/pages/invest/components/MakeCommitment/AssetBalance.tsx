import React from 'react'
import { useBalancesByAssetId } from 'hooks/balance/useBalancesByAssetId'
import { formatMoney } from 'helpers/numbers'
import { OverviewValue } from 'app/pages/invest/components/MakeCommitment/OverviewValue'
import { Grid } from '@mui/material'
import { NoBalance } from 'app/pages/invest/components/MakeCommitment/NoBalance'

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
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <OverviewValue
          label='Available Balance'
          value={formatMoney(
            data.map[assetId]?.available ?? 0,
            data.map[assetId]?.symbol ?? symbol
          )}
        />
      </Grid>
      {(data.map[assetId]?.available ?? 0) <= 0 && (
        <Grid item xs={12}>
          <NoBalance />
        </Grid>
      )}
    </Grid>
  )
}
