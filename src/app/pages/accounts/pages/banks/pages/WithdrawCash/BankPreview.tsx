import React from 'react'
import { BankDetails } from 'app/components/BankDetails'
import { useFormContext } from 'react-hook-form'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { Grid } from '@mui/material'
import { WithdrawCashFormValues } from 'app/pages/accounts/types'
import { privateClassNames } from 'helpers/classnames'

export const BankPreview: React.FC = () => {
  const { watch } = useFormContext<WithdrawCashFormValues>()
  const { data } = useBanksData()
  const bankId = watch('bankAccountId')
  const bank = data.map[bankId ?? '']

  if (bank === undefined) {
    return null
  }

  return (
    <Grid item data-testid='BankPreview' className={privateClassNames()}>
      <BankDetails bank={bank} />
    </Grid>
  )
}
