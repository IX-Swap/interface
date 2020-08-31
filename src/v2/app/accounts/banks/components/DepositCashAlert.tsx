import React from 'react'
import { Typography } from '@material-ui/core'
import { CashTransactionAlert } from 'v2/app/accounts/banks/components/CashTransactionAlert'
import { useFormContext } from 'react-hook-form'
import { DepositCashFormValues } from 'v2/app/accounts/types'

export const DepositCashAlert: React.FC = () => {
  const { getValues } = useFormContext<DepositCashFormValues>()
  const { asset } = getValues()

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
