import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CashDepositVirtualAccountDetails } from 'app/pages/accounts/components/CashDepositVirtualAccountDetails/CashDepositVirtualAccountDetails'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { AutoAssignVirtualAccountForm } from 'app/pages/accounts/pages/banks/components/AutoAssignVirtualAccountForm/AutoAssignVirtualAccountForm'
import { useStyles } from 'app/pages/accounts/pages/banks/pages/DepositCash/DepositCash.styles'
import React, { useState } from 'react'
import { RootContainer } from 'ui/RootContainer'

export const DepositCash: React.FC = () => {
  const { data, isLoading } = useVirtualAccount()
  const [selectedAccount, setSelectedAccount] = useState<string | undefined>(
    undefined
  )
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedAccount(event.target.value as string)
  }
  const styles = useStyles()

  if (isLoading) {
    return null
  }

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <PageHeader title='Cash Deposits' />
      </Grid>

      {data === undefined ? (
        <Grid item className={styles.wrapper}>
          <RootContainer>
            <AutoAssignVirtualAccountForm />
          </RootContainer>
        </Grid>
      ) : (
        <>
          <Grid item className={styles.wrapper}>
            <RootContainer>
              <CashDepositVirtualAccountDetails
                selectedAccount={selectedAccount}
                handleChange={handleChange}
                defaultValue={data.accountNumber}
              />
            </RootContainer>
          </Grid>
        </>
      )}
    </Grid>
  )
}
