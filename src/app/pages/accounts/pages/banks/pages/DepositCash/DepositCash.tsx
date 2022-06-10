import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { RecentDeposits } from 'app/pages/accounts/pages/banks/pages/DepositCash/RecentDeposits'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CashDepositButton } from 'app/pages/accounts/components/CashDepositButton/CashDepositButton'
import { CashDepositVirtualAccountDetails } from 'app/pages/accounts/components/CashDepositVirtualAccountDetails/CashDepositVirtualAccountDetails'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { AutoAssignVirtualAccountForm } from 'app/pages/accounts/pages/banks/components/AutoAssignVirtualAccountForm/AutoAssignVirtualAccountForm'
import { VSpacer } from 'components/VSpacer'
import { RootContainer } from 'ui/RootContainer'
import { useStyles } from 'app/pages/accounts/pages/banks/pages/DepositCash/DepositCash.styles'

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
      <RootContainer>
        <Box className={styles.wrapper}>
          {data === undefined ? (
            <Grid item>
              <AutoAssignVirtualAccountForm />
            </Grid>
          ) : (
            <>
              <Grid item>
                <CashDepositVirtualAccountDetails
                  selectedAccount={selectedAccount}
                  handleChange={handleChange}
                  defaultValue={data.accountNumber}
                />
              </Grid>
              <Grid item>
                <CashDepositButton virtualAccountId={selectedAccount} />
              </Grid>
            </>
          )}
          <Grid item>
            <VSpacer size='medium' />
            <RecentDeposits virtualAccountNumber={selectedAccount} />
          </Grid>
        </Box>
      </RootContainer>
    </Grid>
  )
}
