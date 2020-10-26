import React from 'react'
import { formatMoney } from 'v2/helpers/numbers'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { Asset } from 'v2/types/asset'
import { LabelledValue } from 'v2/components/LabelledValue'
import { Grid } from '@material-ui/core'

export interface DSODetailsProps {
  dso: DigitalSecurityOffering
  currency?: Asset
}

export const DSODetails = (props: DSODetailsProps) => {
  const { dso, currency } = props

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <LabelledValue label='Status' value={dso.status} />
      </Grid>
      <Grid item>
        <LabelledValue label='Capital Structure' value={dso.capitalStructure} />
      </Grid>
      <Grid item>
        <LabelledValue
          label='Unit Price'
          value={formatMoney(dso.pricePerUnit, currency?.symbol)}
        />
      </Grid>
      <Grid item>
        <LabelledValue
          label='Total Fundraising Amount'
          value={formatMoney(dso.totalFundraisingAmount ?? 0, currency?.symbol)}
        />
      </Grid>
      <Grid item>
        <LabelledValue
          label='Minimum Investment'
          value={formatMoney(dso.minimumInvestment ?? 0, dso.tokenSymbol)}
        />
      </Grid>
    </Grid>
  )
}
