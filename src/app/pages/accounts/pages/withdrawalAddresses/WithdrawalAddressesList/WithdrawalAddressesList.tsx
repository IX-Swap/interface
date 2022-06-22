import React from 'react'
import { Grid, Button } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { WithdrawalAddressesTable } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesTable/WithdrawalAddressesTable'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { WithdrawalAddressTooltip } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressTooltip'
import { RootContainer } from 'ui/RootContainer'

export const WithdrawalAddressesList: React.FC = () => {
  return (
    <>
      <Grid container direction='column' style={{ display: 'table' }}>
        <Grid item>
          <PageHeader title='My Blockchain Addresses' />
        </Grid>
        <RootContainer>
          <Grid
            item
            container
            xs={12}
            justifyContent='flex-end'
            spacing={1}
            alignItems='center'
          >
            <Grid item>
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
            <Grid item>
              <WithdrawalAddressTooltip />
            </Grid>
          </Grid>
          <VSpacer size='small' />
          <Grid item>
            <WithdrawalAddressesTable />
          </Grid>
        </RootContainer>
      </Grid>
    </>
  )
}
