import React from 'react'
import { BankDetails } from 'v2/app/components/BankDetails'
import { useFormContext } from 'react-hook-form'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { Grid } from '@material-ui/core'
import { WithdrawCashFormValues } from 'v2/app/pages/accounts/types'
import { privateClassNames } from 'v2/helpers/classnames'

export const BankPreview: React.FC = () => {
  const { watch } = useFormContext<WithdrawCashFormValues>()
  const { data } = useBanksData()
  const bankId = watch('bank')
  const bank = data.map[bankId]

  if (bank === undefined) {
    return null
  }

  return (
    <Grid item data-testid='BankPreview' className={privateClassNames()}>
      <BankDetails bank={bank} />
    </Grid>
  )
}
