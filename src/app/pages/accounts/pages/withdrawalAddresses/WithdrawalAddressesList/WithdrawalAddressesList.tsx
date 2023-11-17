import React from 'react'
import { Grid, Button } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { WithdrawalAddressesTable } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesTable/WithdrawalAddressesTable'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { WithdrawalAddressTooltip } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressTooltip'
import { RootContainer } from 'ui/RootContainer'
import { Add } from '@mui/icons-material'

export const AddWalletAddressButton = ({ large = false, ...rest }) => (
  <Button
    component={AppRouterLinkComponent}
    to={WithdrawalAddressesRoute.create}
    size='medium'
    color='primary'
    variant='contained'
    disableElevation
    sx={{ paddingX: large ? 8 : 4 }}
    {...rest}
  >
    <Add sx={{ marginRight: 1 }} />
    <span>Add Wallet Address</span>
  </Button>
)

export const WithdrawalAddressesList: React.FC = () => {
  return (
    <>
      <Grid container direction='column' style={{ display: 'table' }}>
        <Grid item>
          <PageHeader
            title='My Wallet Addresses'
            endComponent={
              <Grid
                item
                container
                xs={12}
                justifyContent='flex-end'
                spacing={1}
                alignItems='center'
              >
                <Grid item>
                  <AddWalletAddressButton />
                </Grid>
                <Grid item>
                  <WithdrawalAddressTooltip />
                </Grid>
              </Grid>
            }
          />
        </Grid>
        <RootContainer>
          <Grid item>
            <WithdrawalAddressesTable />
          </Grid>
        </RootContainer>
      </Grid>
    </>
  )
}
