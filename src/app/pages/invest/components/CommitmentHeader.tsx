import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Grid } from '@mui/material'
import { DSOTitle } from 'app/components/DSO/components/DSOTitle'
import { EstimatedValue } from 'app/pages/invest/components/EstimatedValue'
import { AssetBalance } from 'app/pages/invest/components/AssetBalance'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { LabelledValue } from 'components/LabelledValue'
import { formatMoney } from 'helpers/numbers'

export interface CommitmentHeaderProps {
  dso: DigitalSecurityOffering
}

export const CommitmentHeader = (props: CommitmentHeaderProps) => {
  const { dso } = props

  useSetPageTitle(`${dso.tokenName} (${dso.tokenSymbol})`)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <DSOTitle dso={dso} />
      </Grid>
      <Grid item xs={4} md={2}>
        <LabelledValue
          label='Minimum Investment'
          value={formatMoney(dso.minimumInvestment, dso.tokenSymbol)}
        />
      </Grid>
      <Grid item xs={4} md={2}>
        <AssetBalance assetId={dso.currency._id} symbol={dso.currency.symbol} />
      </Grid>
      <Grid item xs={4} md={2}>
        <EstimatedValue symbol={dso.currency.symbol} />
      </Grid>
    </Grid>
  )
}
