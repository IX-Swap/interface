import React from 'react'
import { Grid } from '@material-ui/core'
import { LabelledValue } from 'v2/components/LabelledValue'
import { Commitment } from 'v2/types/commitment'
import { formatDateAndTime } from 'v2/helpers/dates'
import { DSOLink } from 'v2/app/components/DSOLink'
import { formatMoney } from 'v2/helpers/numbers'
import { SubscriptionDocument } from 'v2/app/components/SubscriptionDocument'
import { Maybe } from 'v2/types/util'
import { useSetPageTitle } from 'v2/app/hooks/useSetPageTitle'

export interface CommitmentPreviewProps {
  data: Maybe<Commitment>
}

export const CommitmentPreview: React.FC<CommitmentPreviewProps> = (
  props: CommitmentPreviewProps
) => {
  const { data } = props

  useSetPageTitle(`${data?.dso.tokenName} (${data?.dso.tokenSymbol})`)

  if (data === null) {
    return null
  }

  return (
    <Grid container spacing={4}>
      <Grid item container spacing={4}>
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

      <Grid item container spacing={4}>
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
          <LabelledValue label='Number Of Units' value={data.numberOfUnits} />
        </Grid>
      </Grid>

      <Grid item container spacing={4}>
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

      <Grid item container spacing={4}>
        <Grid item xs={12}>
          <SubscriptionDocument
            document={{
              _id: data.signedSubscriptionDocument,
              originalFileName: 'unknown',
              user: data.user._id,
              createdAt: '',
              title: '',
              type: 'Signed Subscription Document',
              updatedAt: '',
              url: ''
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
