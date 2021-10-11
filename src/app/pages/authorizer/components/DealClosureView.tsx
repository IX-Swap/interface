import { Grid } from '@material-ui/core'
import { Closure } from 'app/pages/authorizer/pages/DealClosures/DealClosures'
import { LabelledValue } from 'components/LabelledValue'
import { formatDateToMMDDYY } from 'helpers/dates'
import { formatMoney } from 'helpers/numbers'
import React from 'react'

export interface DealClosureViewProps {
  data: Closure
}

export const DealClosureView = ({ data }: DealClosureViewProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <LabelledValue
          label='Company Name'
          value={data.dso.corporate.companyLegalName}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <LabelledValue label='Issued By' value={data.user.name} />
      </Grid>
      <Grid item xs={12} md={4}>
        <LabelledValue
          label='Issue Date'
          value={formatDateToMMDDYY(data.dso.createdAt)}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <LabelledValue label='Digital Security' value={data.dso.tokenName} />
      </Grid>
      <Grid item xs={12} md={4}>
        <LabelledValue
          label='Price Per Unit'
          value={formatMoney(data.dso.pricePerUnit, data.dso.currency.symbol)}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <LabelledValue
          label='Minimum Investment'
          value={data.dso.minimumInvestment}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <LabelledValue
          label='Capital Structure'
          value={data.dso.capitalStructure}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <LabelledValue
          label='Total Amount Raised'
          value={formatMoney(
            data.dso.insight.raisedTotal,
            data.dso.currency.symbol
          )}
        />
      </Grid>
    </Grid>
  )
}
