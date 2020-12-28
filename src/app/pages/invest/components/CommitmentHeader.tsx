import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Grid } from '@material-ui/core'
import { DSOTitle } from 'app/components/DSO/components/DSOTitle'
import { EstimatedValue } from 'app/pages/invest/components/EstimatedValue'
import { AssetBalance } from 'app/pages/invest/components/AssetBalance'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'

export interface CommitmentHeaderProps {
  dso: DigitalSecurityOffering
}

export const CommitmentHeader = (props: CommitmentHeaderProps) => {
  const { dso } = props

  useSetPageTitle(`${dso.tokenName} (${dso.tokenSymbol})`)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <DSOTitle dso={dso} />
      </Grid>
      <Grid item xs={4} sm={3}>
        <AssetBalance assetId={dso.currency._id} />
      </Grid>
      <Grid item xs={4} sm={3}>
        <EstimatedValue symbol={dso.currency.symbol} />
      </Grid>
    </Grid>
  )
}
