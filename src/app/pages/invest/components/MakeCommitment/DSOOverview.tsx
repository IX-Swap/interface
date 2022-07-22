import { Paper, Grid } from '@mui/material'
import { DSOTitle } from 'app/components/DSO/components/DSOTitle'
import { AssetBalance } from 'app/pages/invest/components/MakeCommitment/AssetBalance'
import { DSOBlockchainDetails } from 'app/pages/invest/components/DSOBlockChainDetails/DSOBlockchainDetails'
import { OverviewValue } from 'app/pages/invest/components/MakeCommitment/OverviewValue'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'

export interface DSOOverviewProps {
  dso: DigitalSecurityOffering
}

export const DSOOverview = ({ dso }: DSOOverviewProps) => {
  return (
    <Paper sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DSOTitle dso={dso} />
        </Grid>
        <Grid item xs={12}>
          <OverviewValue
            label='Minimum Investment'
            value={`${dso.minimumInvestment ?? 0} ${dso.tokenSymbol}`}
          />
        </Grid>
        <Grid item xs={12}>
          <AssetBalance symbol={dso.currency.symbol} />
        </Grid>
        <Grid item xs={12}>
          <DSOBlockchainDetails dso={dso} />
        </Grid>
      </Grid>
    </Paper>
  )
}
