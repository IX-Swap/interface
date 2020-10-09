import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { INVESTAX_BANK } from 'v2/config'
import { CashDeposit } from 'v2/types/cashDeposit'
import { BankDetails } from 'v2/app/components/BankDetails'
import { formatMoney } from 'v2/helpers/numbers'
import { LabelledValue } from 'v2/components/LabelledValue'

export interface DepositView {
  data: CashDeposit
}

export const DepositView = (props: DepositView) => {
  const { data } = props
  const bankAccount = { ...INVESTAX_BANK }

  return (
    <Grid container justify='center' direction='column'>
      <Grid container>
        <Grid item xs={6}>
          <LabelledValue
            label='Deposit Amount'
            value={formatMoney(data.amount, data.asset.symbol)}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelledValue label='Deposit Code' value={data.depositCode} />
        </Grid>
      </Grid>
      <Box py={2} />
      <BankDetails bank={bankAccount} />
    </Grid>
  )
}
