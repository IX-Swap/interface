import React from 'react'
import { Grid } from '@mui/material'
import { formatMoney } from 'helpers/numbers'
import { CashWithdrawal } from 'types/cashWithdrawal'
import { convertAddressToString } from 'app/pages/authorizer/components/utils'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { FieldGrid } from 'ui/FieldGrid/FieldGrid'

export interface WithdrawalViewProps {
  data: CashWithdrawal
}

export const WithdrawalPreview = (props: WithdrawalViewProps) => {
  const { data } = props

  useSetPageTitle(data.bank.bankName)

  const items = [
    {
      label: 'Bank Name',
      value: data.bank.bankName
    },
    {
      label: 'Account Holder Name',
      value: data.bank.accountHolderName
    },
    {
      label: 'Virtual Account',
      value: data.virtualAccount?.accountNumber
    },
    {
      label: 'Swift Code',
      value: data.bank.swiftCode
    },
    {
      label: 'Currency',
      value: data.asset.symbol
    },
    {
      label: 'Bank Address',
      value: convertAddressToString(data.bank.address)
    },
    {
      label: 'Bank Account Number',
      value: data.bank.bankAccountNumber
    },
    {
      label: 'Withdrawal Method',
      value: data.paymentMethodName
    },
    {
      label: 'Withdrawal Amount',
      value: formatMoney(data.amount, data.asset.symbol)
    }
  ]

  return (
    <Grid container pt={3} pl={3}>
      <Grid item xs={12}>
        <FieldGrid items={items} />
      </Grid>
    </Grid>
  )
}
