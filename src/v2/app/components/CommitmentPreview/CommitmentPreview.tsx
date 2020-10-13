import React from 'react'
import { Card, CardContent, Grid } from '@material-ui/core'
import { LabelledValue } from 'v2/components/LabelledValue'
import { Commitment } from 'v2/types/commitment'
import { formatDateAndTime } from 'v2/helpers/dates'
import { DSOLink } from 'v2/app/components/DSOLink'
import { formatMoney } from 'v2/helpers/numbers'

interface CommitmentPreviewProps {
  data: Commitment
}

export const CommitmentPreview: React.FC<CommitmentPreviewProps> = (
  props: CommitmentPreviewProps
) => {
  const { data } = props

  if (data === null) {
    return null
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item container>
            <Grid item xs={4}>
              <LabelledValue
                label='Company Name'
                value={data.dso.corporate.companyLegalName}
              />
            </Grid>
            <Grid item xs={4}>
              <LabelledValue label='Issued By' value={data.dso.issuerName} />
            </Grid>
            <Grid item xs={4}>
              <LabelledValue
                label='Issued Date'
                value={formatDateAndTime(data.dso.createdAt)}
              />
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={4}>
              <LabelledValue
                label='Digital Security'
                value={<DSOLink dso={data.dso} />}
              />
            </Grid>
            <Grid item xs={4}>
              <LabelledValue
                label='Price Per Unit'
                value={formatMoney(data.dso.pricePerUnit, data.currency.symbol)}
              />
            </Grid>
            <Grid item xs={4}>
              <LabelledValue
                label='Number Of Units'
                value={data.numberOfUnits}
              />
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={4}>
              <LabelledValue
                label='Investment Structure'
                value={data.dso.investmentStructure}
              />
            </Grid>
            <Grid item xs={4}>
              <LabelledValue
                label='Total Amount'
                value={formatMoney(data.totalAmount, data.currency.symbol)}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
