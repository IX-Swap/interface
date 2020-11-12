import React from 'react'
import { useFormContext } from 'react-hook-form'
import { INVESTAX_BANK } from 'v2/config'
import { formatMoney } from 'v2/helpers/numbers'
import { GenericPreview } from 'v2/app/components/GenericPreview/GenericPreview'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { WithdrawCashFormValues } from 'v2/app/pages/accounts/types'
import { Alert } from '@material-ui/lab'
import { VSpacer } from 'v2/components/VSpacer'

export const Preview: React.FC = () => {
  const { watch } = useFormContext<WithdrawCashFormValues>()
  const { data, isLoading } = useBanksData()
  const bankId = watch('bank')
  const amountFormatted = watch('amount')
  const memo = watch('memo')
  const bank = data.map[bankId]

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
      value: formatMoney(amountFormatted, bank.currency.numberFormat.currency),
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
