import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { formatMoney } from 'v2/helpers/numbers'
import { BankDetails } from 'v2/app/components/BankDetails'
import { CashWithdrawal } from 'v2/types/cashWithdrawal'
import { LabelledValue } from 'v2/components/LabelledValue'

export interface WithdrawalViewProps {
  data: CashWithdrawal
}

export const WithdrawalPreview = (props: WithdrawalViewProps) => {
  const { data } = props

  return (
    <Grid container justify='center' direction='column'>
      <Grid container>
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
      </Grid>
      <Box py={2} />
      <BankDetails bank={data.bank} />
    </Grid>
  )
}
