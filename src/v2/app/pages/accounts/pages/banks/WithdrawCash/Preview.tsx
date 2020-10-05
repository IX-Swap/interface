import React from 'react'
import { useFormContext } from 'react-hook-form'
import { INVESTAX_BANK } from 'v2/config'
import { formatMoney } from 'v2/helpers/numbers'
import { Box, Typography } from '@material-ui/core'
import { GenericPreview } from 'v2/app/components/GenericPreview/GenericPreview'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { WithdrawCashFormValues } from 'v2/app/pages/accounts/types'

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
      value: bank.bankAccountNumber
    },
    {
      label: 'Account Number',
      value: INVESTAX_BANK.bankAccountNumber ?? ''
    },
    {
      label: 'Withdraw Amount',
      value: formatMoney(amountFormatted, bank.currency.numberFormat.currency)
    }
  ]

  if (memo !== undefined) {
    items.push({
      label: 'Memo',
      value: memo
    })
  }

  return (
    <>
      <Box p={2}>
        <Typography variant='subtitle1' align='center'>
          <b>Are you sure you want to continue with this transaction?</b>
        </Typography>
      </Box>
      <GenericPreview items={items} />
    </>
  )
}
