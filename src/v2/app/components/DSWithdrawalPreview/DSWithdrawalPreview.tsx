import React from 'react'
import { Grid } from '@material-ui/core'
import { DSWithdrawal } from 'v2/types/dsWithdrawal'
import { formatMoney } from 'v2/helpers/numbers'
import { LabelledValue } from 'v2/components/LabelledValue'

export interface DSWithdrawalPreviewProps {
  data: DSWithdrawal
}

export const DSWithdrawalPreview = (props: DSWithdrawalPreviewProps) => {
  const { data } = props

  return (
    <Grid container justify='center' direction='column'>
      <Grid container>
        <Grid item xs={6}>
          <LabelledValue
            label='Digital Security'
            value={data.asset.name}
            labelWeight='thin'
            row
          />
        </Grid>
        <Grid item xs={6}>
          <LabelledValue
            label='Withdrawal Amount'
            value={formatMoney(data.amount, data.asset.symbol)}
            labelWeight='thin'
            row
          />
        </Grid>

        <Grid item xs={6}>
          <LabelledValue
            label='Memo'
            value={data.memo}
            labelWeight='thin'
            row
          />
        </Grid>
        <Grid item xs={12}>
          <LabelledValue
            label='Withdrawal Address'
            value={data.recipientWallet}
            labelWeight='thin'
            row
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
