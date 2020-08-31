import React from 'react'
import { useFormContext } from 'react-hook-form'
import { INVESTAX_BANK } from 'v2/config'
import { formatMoney } from 'v2/helpers/numbers'
import { Box, Typography } from '@material-ui/core'
import GenericPreview from 'v2/app/components/generic-preview'
import { useBanks } from 'v2/app/accounts/banks/hooks/useBanks'
import { WithdrawCashFormValues } from 'v2/app/accounts/types'

export const Preview: React.FC = () => {
  const { getValues } = useFormContext<WithdrawCashFormValues>()
  const { data } = useBanks()
  const { bank: bankId, amount: amountFormatted, memo } = getValues()
  const bank = data.map[bankId]
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
      value: formatMoney(amountFormatted, bank.asset.numberFormat.currency)
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
