import React from 'react'
import { Grid, Link } from '@material-ui/core'
import { DSWithdrawal } from 'v2/types/dsWithdrawal'
import { formatMoney } from 'v2/helpers/numbers'
import { LabelledValue } from 'v2/components/LabelledValue'
import { renderName } from 'v2/helpers/tables'
import { useSetPageTitle } from 'v2/app/hooks/useSetPageTitle'
import { getOfferingName } from 'v2/helpers/strings'

export interface DSWithdrawalPreviewProps {
  data: DSWithdrawal
}

export const DSWithdrawalPreview = (props: DSWithdrawalPreviewProps) => {
  const { data } = props

  useSetPageTitle(getOfferingName(data))

  return (
    <Grid container justify='center' direction='column'>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <LabelledValue
            label='Digital Security'
            value={`${data.asset.name} (${data.asset.symbol})`}
          />
        </Grid>

        <Grid item xs={6}>
          <LabelledValue
            label='Withdrawal By'
            value={renderName('', data.identity.individual)}
          />
        </Grid>

        <Grid item xs={6}>
          <LabelledValue
            label='Withdrawal Address'
            value={data.recipientWallet}
          />
        </Grid>

        <Grid item xs={6}>
          <LabelledValue
            label='Withdrawal Amount'
            value={formatMoney(data.amount, data.asset.symbol)}
          />
        </Grid>

        <Grid item xs={6}>
          <LabelledValue
            label='Transaction'
            value={<Link href='#'>{data.transaction}</Link>}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
