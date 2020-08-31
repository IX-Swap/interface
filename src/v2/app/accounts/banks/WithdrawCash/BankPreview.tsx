import React from 'react'
import BankDetails from 'v2/app/components/bank-details'
import { useFormContext } from 'react-hook-form'
import { useBanks } from 'v2/app/accounts/banks/hooks/useBanks'
import { Box } from '@material-ui/core'
import { WithdrawCashFormValues } from 'v2/app/accounts/types'

export const BankPreview: React.FC = () => {
  const { getValues } = useFormContext<WithdrawCashFormValues>()
  const { data } = useBanks()
  const { bank: bankId } = getValues()
  const bank = data.map[bankId]

  if (bank === undefined) {
    return null
  }

  return (
    <Box py={4}>
      <BankDetails bank={bank} />
    </Box>
  )
}
