import React from 'react'
import { Grid } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { DigitalSecurityOffering } from 'types/dso'

export interface DSOInvestorOverviewProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestorOverview = (props: DSOInvestorOverviewProps) => {
  const { dso } = props

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container spacing={3}>
        <Grid item xs={12} md={4}>
          <LabelledValue label='Network' value={dso.network?.name} />
        </Grid>

        <Grid item xs={12} md={4}>
          <LabelledValue
            label='Capital Structure'
            value={dso.capitalStructure}
          />
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item xs={12} md={4}>
          <LabelledValue label='Launch Date' value={dso.launchDate} />
        </Grid>
        <Grid item xs={12} md={4}>
          <LabelledValue label='Completion Date' value={dso.completionDate} />
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item xs={12} md={4}>
          <LabelledValue label='Decimal' value={dso.decimalPlaces} />
        </Grid>

        <Grid item xs={12} md={4}>
          <LabelledValue
            label='Token Address'
            value={dso.deploymentInfo?.token}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
