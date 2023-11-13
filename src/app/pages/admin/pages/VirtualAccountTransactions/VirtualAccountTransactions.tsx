import React from 'react'
import { Grid, Button } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VirtualTransactionsTable } from 'app/pages/admin/components/VirtualTransactionsTable/VirtualTransactionsTable'
import { VirtualTransactionsFilters } from 'app/pages/admin/components/VirtualTransactionsFilters'
import { RootContainer } from 'ui/RootContainer'
import { VirtualAccountsRoute } from '../../router/config'

const CreateVATransactionButton = () => (
  <Button
    component={AppRouterLinkComponent}
    to={VirtualAccountsRoute.transactions.create}
    size='large'
    color='primary'
    variant='contained'
    disableElevation
  >
    Create VA Transaction
  </Button>
)

export const VirtualAccountTransactions = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader
          title='Virtual Account Transactions'
          endComponent={<CreateVATransactionButton />}
        />
      </Grid>
      <RootContainer>
        <Grid item>
          <VirtualTransactionsFilters />
        </Grid>
        <Grid item mt={2}>
          <VirtualTransactionsTable />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
