import { Grid, Typography, Button } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { CashTable } from 'app/pages/accounts/pages/cash/components/CashTable'
import { NoCashButtons } from './components/NoCashButtons'
import { CashBalance } from 'app/pages/accounts/components/CashBalance'
import { RecentTransactionsTable } from './components/RecentTransactionsTable'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AccountsRoute } from 'app/pages/accounts/router/config'

export const Cash = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader
          title='Cash'
          endComponent={
            <Button
              variant='contained'
              color='primary'
              size='medium'
              disableElevation
              sx={{ paddingX: 5, paddingY: 2 }}
              component={AppRouterLinkComponent}
              to={AccountsRoute.banks}
            >
              View Cash Accounts
            </Button>
          }
        />
      </Grid>
      <RootContainer>
        <Grid container spacing={{ xs: 2, md: 6 }}>
          <Grid item xs={12}>
            <CashBalance />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='h4'
              display={'inline-flex'}
              alignItems={'center'}
              mb={3}
            >
              Cash
            </Typography>
            <CashTable />
            <NoCashButtons />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='h4'
              display={'inline-flex'}
              alignItems={'center'}
              mb={3}
            >
              Recent Transactions
            </Typography>
            <RecentTransactionsTable />
          </Grid>
        </Grid>
      </RootContainer>
    </Grid>
  )
}
