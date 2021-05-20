import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { RecentDeposits } from 'app/pages/accounts/pages/banks/pages/DepositCash/RecentDeposits'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CashDepositButton } from 'app/pages/accounts/components/CashDepositButton/CashDepositButton'
import { CashDepositVirtualAccountDetails } from 'app/pages/accounts/components/CashDepositVirtualAccountDetails/CashDepositVirtualAccountDetails'

export const DepositCash: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<string | undefined>(
    undefined
  )
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedAccount(event.target.value as string)
  }

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <PageHeader title='Cash Deposits' />
      </Grid>
      <Grid item>
        <CashDepositVirtualAccountDetails
          selectedAccount={selectedAccount}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item>
        <CashDepositButton />
      </Grid>
      <Grid item>
        <RecentDeposits virtualAccountNumber={selectedAccount} />
      </Grid>
    </Grid>
  )
}
