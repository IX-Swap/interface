import React from 'react'
import { useFormContext } from 'react-hook-form'
import { INVESTAX_BANK } from 'config'
import { formatMoney } from 'helpers/numbers'
import { GenericPreview } from 'app/components/GenericPreview/GenericPreview'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { WithdrawCashFormValues } from 'app/pages/accounts/types'
import { Alert } from '@mui/material'
import { VSpacer } from 'components/VSpacer'

export const Preview: React.FC = () => {
  const { watch } = useFormContext<WithdrawCashFormValues>()
  const { data, isLoading } = useBanksData()
  const bankId = watch('bankAccountId')
  const amountFormatted = watch('amount', 0)
  const memo = watch('memo')
  const bank = data.map[bankId ?? '']

  if (isLoading) {
    return null
  }

  const items = [
    {
      label: 'Bank',
      value: bank.bankName
    },
    {
      label: 'Account No',
      value: bank.bankAccountNumber,
      secret: true
    },
    {
      label: 'Account Number',
      value: INVESTAX_BANK.bankAccountNumber ?? ''
    },
    {
      label: 'Withdraw Amount',
      value: formatMoney(
        amountFormatted ?? 0,
        bank.currency.numberFormat.currency
      ),
      secret: true
    }
  ]

  if (memo !== undefined) {
    items.push({
      label: 'Memo',
      value: memo,
      secret: true
    })
  }

  return (
    <>
      <Alert severity='info'>
        Are you sure you want to continue with this transaction?
      </Alert>
      <VSpacer size='small' />
      <GenericPreview items={items} />
    </>
  )
}
