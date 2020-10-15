import React from 'react'
import { Grid } from '@material-ui/core'
import { formatMoney } from 'v2/helpers/numbers'
import { CashWithdrawal } from 'v2/types/cashWithdrawal'
import { LabelledValue } from 'v2/components/LabelledValue'
import { convertAddressToString } from 'v2/app/pages/authorizer/components/utils'

export interface WithdrawalViewProps {
  data: CashWithdrawal
}

export const WithdrawalPreview = (props: WithdrawalViewProps) => {
  const { data } = props

  return (
    <Grid container justify='center' direction='column' spacing={4}>
      <Grid item container spacing={4}>
        <Grid item xs={4}>
          <LabelledValue label='Bank Name' value={data.bank.bankName} />
        </Grid>

        <Grid item xs={4}>
          <LabelledValue
            label='Account Holder Name'
            value={data.bank.accountHolderName}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={4}>
        <Grid item xs={4}>
          <LabelledValue
            label='Bank Account Number'
            value={data.bank.bankAccountNumber}
          />
        </Grid>

        <Grid item xs={4}>
          <LabelledValue label='Swift Code' value={data.bank.swiftCode} />
        </Grid>

        <Grid item xs={4}>
          <LabelledValue label='Currency' value={data.bank?.currency?.symbol} />
        </Grid>
      </Grid>

      <Grid item container spacing={4}>
        <Grid item xs={4}>
          <LabelledValue
            label='Bank Address'
            value={convertAddressToString(data.bank.address)}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={4}>
        <Grid item xs={4}>
          <LabelledValue
            label='Withdrawal Amount'
            value={formatMoney(data.amount, data.asset.symbol)}
          />
        </Grid>

        <Grid item xs={4}>
          <LabelledValue label='Memo' value={data.memo} />
        </Grid>
      </Grid>
    </Grid>
  )
}
