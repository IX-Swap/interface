import { Box, Grid, Paper } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React, { useState } from 'react'
import { VirtualAccountCashDeposit } from 'app/pages/accounts/components/VirtualAccountCashDeposit/VirtualAccountCashDeposit'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { CurrencySelect } from 'app/pages/accounts/components/CurrencySelect/CurrencySelect'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { BackToCash } from 'app/pages/accounts/pages/withdraw/components/BackToCash'

export const Deposit = () => {
  const { getFilterValue } = useQueryFilter()
  const accountFromFilter = getFilterValue('account')
  const [virtualAccountId, setVirtualAccountId] = useState<string | undefined>(
    accountFromFilter
  )

  const { data, list, isLoading } = useVirtualAccount(virtualAccountId)

  return (
    <Grid container direction='column' spacing={1} paddingBottom={3}>
      <Grid item>
        <PageHeader
          title={'Deposit to Virtual Account'}
          subtitle={'Bank charges may apply and will be borne by the clients'}
          wrapperStyle={{ backgroundColor: 'inherit' }}
          variant='h1'
          titleStyle={{ fontSize: 32, height: 'initial' }}
          alignment='center'
          showBreadcrumbs={false}
          startComponent={<BackToCash />}
        />
      </Grid>
      {isLoading ? null : (
        <Grid item container justifyContent={'center'}>
          <Grid item>
            <Paper
              sx={{
                maxWidth: 608,
                borderRadius: 2,
                marginRight: 2,
                marginLeft: 2
              }}
            >
              <Box
                sx={{
                  px: { xs: 3, sm: 5 },
                  paddingTop: 5
                }}
              >
                <CurrencySelect
                  accounts={list}
                  defaultValue={accountFromFilter}
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
