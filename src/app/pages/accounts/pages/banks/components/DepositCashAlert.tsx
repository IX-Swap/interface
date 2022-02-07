import React from 'react'
import { Typography } from '@mui/material'
import { CashTransactionAlert } from 'app/pages/accounts/pages/banks/components/CashTransactionAlert'
import { useFormContext } from 'react-hook-form'
import { DepositCashFormValues } from 'app/pages/accounts/types'

export const DepositCashAlert: React.FC = () => {
  const { watch } = useFormContext<DepositCashFormValues>()
  const asset = watch('asset')

  return (
    <CashTransactionAlert assetId={asset}>
      {money => (
        <Typography variant='caption' align='center'>
          You will be transferring {money} in the above-mentioned bank account.{' '}
          <br /> Use the transfer code in the transfer remarks field. <br />{' '}
          Please confirm your bank account before proceeding.
        </Typography>
      )}
    </CashTransactionAlert>
  )
}
