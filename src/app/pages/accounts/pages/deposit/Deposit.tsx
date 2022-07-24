import { Box, Grid, Paper } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React, { useState } from 'react'
import { VirtualAccountCashDeposit } from 'app/pages/accounts/components/VirtualAccountCashDeposit/VirtualAccountCashDeposit'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { CurrencySelect } from 'app/pages/accounts/components/CurrencySelect/CurrencySelect'

export const Deposit = () => {
  const [virtualAccountId, setVirtualAccountId] = useState<string | undefined>(
    undefined
  )

  const { data, list, isLoading } = useVirtualAccount(virtualAccountId)

  return (
    <Grid container direction='column' spacing={3} paddingBottom={3}>
      <Grid item>
        <PageHeader title='Deposit to Virtual Account' />
      </Grid>
      {isLoading ? null : (
        <Grid item container justifyContent={'center'}>
          <Grid item>
            <Paper sx={{ maxWidth: 608, borderRadius: 2 }}>
              <Box sx={{ px: { xs: 3, sm: 5 }, paddingTop: 5 }}>
                <CurrencySelect
                  accounts={list}
                  defaultValue={data.accountNumber}
                  onButtonClick={setVirtualAccountId}
                />
              </Box>
              <VirtualAccountCashDeposit virtualAccountDetails={data} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}
