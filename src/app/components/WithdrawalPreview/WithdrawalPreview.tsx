import React from 'react'
import { Grid } from '@mui/material'
import { formatMoney } from 'helpers/numbers'
import { CashWithdrawal } from 'types/cashWithdrawal'
import { LabelledValue } from 'components/LabelledValue'
import { convertAddressToString } from 'app/pages/authorizer/components/utils'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'

export interface WithdrawalViewProps {
  data: CashWithdrawal
}

export const WithdrawalPreview = (props: WithdrawalViewProps) => {
  const { data } = props

  useSetPageTitle(data.bank.bankName)

  return (
    <Grid container justifyContent='center' direction='column' spacing={4}>
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
            label='Virtual Account'
            value={data.virtualAccount?.accountNumber}
          />
        </Grid>

        <Grid item xs={4}>
          <LabelledValue label='Swift Code' value={data.bank.swiftCode} />
        </Grid>

        <Grid item xs={4}>
          <LabelledValue label='Currency' value={data.asset.symbol} />
        </Grid>
      </Grid>

      <Grid item container spacing={4}>
        <Grid item xs={4}>
          <LabelledValue
            label='Bank Address'
            value={convertAddressToString(data.bank.address)}
          />
        </Grid>
        <Grid item xs={4}>
          <LabelledValue
            label='Bank Contact Number'
            value={data.bank.bankAccountNumber}
          />
        </Grid>
        <Grid item xs={4}>
          <LabelledValue
            label='Withdrawal Method'
            value={data.paymentMethodName}
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
      </Grid>
    </Grid>
  )
}
