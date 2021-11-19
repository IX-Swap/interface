import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { WithdrawalAddressesTable } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesTable/WithdrawalAddressesTable'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const WithdrawalAddressesList: React.FC = () => {
  return (
    <>
      <Grid container direction='column'>
        <Grid item>
          <PageHeader title='Withdrawal Addresses' />
        </Grid>
        <Grid item>
          <Grid item container xs={12} justify='flex-end'>
            <Button
              component={AppRouterLinkComponent}
              to={WithdrawalAddressesRoute.create}
              variant='contained'
              color='primary'
              disableElevation
            >
              Add Address
            </Button>
          </Grid>
        </Grid>
        <VSpacer size='small' />
        <Grid item>
          <WithdrawalAddressesTable />
        </Grid>
      </Grid>
    </>
  )
}
