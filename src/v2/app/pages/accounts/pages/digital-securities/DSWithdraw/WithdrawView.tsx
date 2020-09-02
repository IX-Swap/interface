import React from 'react'
import { Grid } from '@material-ui/core'
import { DSDepositInput } from 'v2/app/pages/accounts/pages/digital-securities/DSDeposit/Setup'
import { BalancesList } from 'v2/app/pages/accounts/pages/digital-securities/DSDeposit/BalancesList'
import { Preview } from 'v2/app/pages/accounts/pages/digital-securities/DSWithdraw/Preview'
import { Setup } from 'v2/app/pages/accounts/pages/digital-securities/DSWithdraw/Setup'
import { useDepositStore } from 'v2/app/pages/accounts/pages/banks/context'
import { observer } from 'mobx-react'

export const WithdrawView: React.FC = observer(() => {
  const { isPreview } = useDepositStore()

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <DSDepositInput />
        <BalancesList />
      </Grid>
      <Grid item xs={12} sm={6}>
        {isPreview ? <Preview /> : <Setup />}
      </Grid>
    </Grid>
  )
})
