import React from 'react'
import { Typography } from '@material-ui/core'
import { CashTransactionAlert } from 'v2/app/accounts/banks/components/CashTransactionAlert'
import { useFormContext } from 'react-hook-form'
import { WithdrawCashFormValues } from 'v2/app/accounts//types'
import { useBanks } from 'v2/app/accounts/banks/hooks/useBanks'

export const WithdrawCashAlert: React.FC = () => {
  const { getValues } = useFormContext<WithdrawCashFormValues>()
  const { bank: bankId } = getValues()
  const { data, status } = useBanks()
  const bank = data.map[bankId]

  if (status === 'loading') {
    return null
  }

  return (
    <CashTransactionAlert assetId={bank.asset._id}>
      {money => (
        <Typography variant='caption' align='center'>
          You will be withdrawing {money} to the above-mentioned bank account.
          <br /> Please confirm your bank account before proceeding.
        </Typography>
      )}
    </CashTransactionAlert>
  )
}
