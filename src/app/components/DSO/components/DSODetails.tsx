import React from 'react'
import { formatMoney } from 'helpers/numbers'
import { DigitalSecurityOffering } from 'types/dso'
import { LabelledValue } from 'components/LabelledValue'
import { Grid } from '@mui/material'

export interface DSODetailsProps {
  dso: DigitalSecurityOffering
}

export const DSODetails = (props: DSODetailsProps) => {
  const { dso } = props

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
          value={formatMoney(dso.pricePerUnit, dso.currency.symbol)}
        />
      </Grid>
      <Grid item>
        <LabelledValue
          label='Total Fundraising Amount'
          value={formatMoney(
            dso.totalFundraisingAmount ?? 0,
            dso.currency.symbol
          )}
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
