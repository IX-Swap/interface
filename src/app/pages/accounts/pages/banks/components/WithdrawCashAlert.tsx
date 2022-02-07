import React from 'react'
import { Typography } from '@mui/material'
import { CashTransactionAlert } from 'app/pages/accounts/pages/banks/components/CashTransactionAlert'
import { useFormContext } from 'react-hook-form'
import { WithdrawCashFormValues } from 'app/pages/accounts/types'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'

export const WithdrawCashAlert: React.FC = () => {
  const { watch } = useFormContext<WithdrawCashFormValues>()
  const bankId = watch('bankAccountId')
  const { data, status } = useBanksData()
  const bank = data.map[bankId ?? '']

  if (status === 'loading') {
    return null
  }

  return (
    <CashTransactionAlert assetId={bank.currency._id}>
      {money => (
        <Typography variant='caption' align='center'>
          You will be withdrawing {money} to the above-mentioned bank account.
          <br /> Please confirm your bank account before proceeding.
        </Typography>
      )}
    </CashTransactionAlert>
  )
}
