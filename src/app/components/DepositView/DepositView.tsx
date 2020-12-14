import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { INVESTAX_BANK } from 'config'
import { CashDeposit } from 'types/cashDeposit'
import { BankDetails } from 'app/components/BankDetails'
import { formatMoney } from 'helpers/numbers'
import { LabelledValue } from 'components/LabelledValue'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'

export interface DepositViewProps {
  data: CashDeposit
}

export const DepositView = (props: DepositViewProps) => {
  const { data } = props
  const bankAccount = INVESTAX_BANK

  useSetPageTitle(data.depositCode)

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
