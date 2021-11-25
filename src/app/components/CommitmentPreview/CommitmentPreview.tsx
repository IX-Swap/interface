import React from 'react'
import { Grid } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { Commitment } from 'types/commitment'
import { formatDateAndTime } from 'helpers/dates'
import { DSOLink } from 'app/components/DSOLink'
import { formatMoney } from 'helpers/numbers'
import { SubscriptionDocument } from 'app/components/SubscriptionDocument'
import { Maybe } from 'types/util'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getOfferingName } from 'helpers/strings'
import { privateClassNames } from 'helpers/classnames'
import { CommitmentIssuance } from 'app/components/CommitmentIssuance/CommitmentIssuance'
import { CommitmentWithdrawalAddress } from 'app/components/CommitmentWithdrawalAddress'

export interface CommitmentPreviewProps {
  data: Maybe<Commitment>
  isUserView?: boolean
}

export const CommitmentPreview: React.FC<CommitmentPreviewProps> = (
  props: CommitmentPreviewProps
) => {
  const { data, isUserView = false } = props

  useSetPageTitle(getOfferingName(data))

  if (data === null) {
    return null
  }

  const showTokenIssuance = !isUserView && data.status !== 'Rejected'

  return (
    <Grid container spacing={4} className={privateClassNames()}>
      <Grid item container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue
            label='Company Name'
            value={data.dso.corporate.companyLegalName}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue label='Issued By' value={data.dso.issuerName} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue
            label='Issued Date'
            value={formatDateAndTime(data.dso.createdAt)}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue
            label='Digital Security'
            value={<DSOLink dso={data.dso} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue
            label='Price Per Unit'
            value={formatMoney(data.dso.pricePerUnit, data.currency.symbol)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue label='Number Of Units' value={data.numberOfUnits} />
        </Grid>
      </Grid>

      <Grid item container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue
            label='Investment Structure'
            value={data.dso.investmentStructure}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue
            label='Total Amount'
            value={formatMoney(data.totalAmount, data.currency.symbol)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue
            label='Blockchain Address'
            value={
              <CommitmentWithdrawalAddress
                address={data.withdrawalAddress?.address}
              />
            }
          />
        </Grid>
      </Grid>
      {showTokenIssuance && <CommitmentIssuance data={data} />}
      <Grid item container spacing={4}>
        <Grid item xs={12}>
          <SubscriptionDocument document={data.signedSubscriptionDocument} />
        </Grid>
      </Grid>
    </Grid>
  )
}
