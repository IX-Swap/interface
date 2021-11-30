import { Grid } from '@material-ui/core'
import { WalletAddress } from 'app/components/WalletAddress'
import { LabelledValue } from 'components/LabelledValue'
import { formatDateToMMDDYY } from 'helpers/dates'
import React from 'react'

export interface BasicOverviewProps {
  networkName: string
  capitalStructure: string
  launchDate: string
  completionDate: string
  decimalPlaces: string
  tokenAddress: string
}

export const BasicOverview = ({
  networkName,
  capitalStructure,
  launchDate,
  completionDate,
  decimalPlaces,
  tokenAddress
}: BasicOverviewProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue label='Network' value={networkName} />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <LabelledValue label='Capital Structure' value={capitalStructure} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue
          label='Launch Date'
          value={formatDateToMMDDYY(launchDate)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <LabelledValue
          label='Completion Date'
          value={formatDateToMMDDYY(completionDate)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue label='Decimal' value={decimalPlaces} />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <LabelledValue
          label='Token Address'
          value={<WalletAddress address={tokenAddress} />}
        />
      </Grid>
    </Grid>
  )
}
