import React from 'react'
import { Grid, Link } from '@mui/material'
import { DSWithdrawal } from 'types/dsWithdrawal'
import { formatMoney } from 'helpers/numbers'
import { LabelledValue } from 'components/LabelledValue'
// import { renderName } from 'helpers/tables'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getOfferingName } from 'helpers/strings'

export interface DSWithdrawalPreviewProps {
  data: DSWithdrawal
}

export const DSWithdrawalPreview = (props: DSWithdrawalPreviewProps) => {
  const { data } = props

  useSetPageTitle(getOfferingName(data))

  return (
    <Grid container justifyContent='center' direction='column'>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <LabelledValue
            label='Security Token'
            value={`${data.asset.name} (${data.asset.symbol})`}
          />
        </Grid>

        <Grid item xs={6}>
          <LabelledValue
            label='Withdrawal By'
            // value={renderName('', data.identity.individual)}
            value={data.user.name}
          />
        </Grid>

        <Grid item xs={6}>
          <LabelledValue
            label='Blockchain Address'
            // value={data.recipientWallet}
            value={data.withdrawalAddress.address}
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
