import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { WithdrawalAddressesTable } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesTable/WithdrawalAddressesTable'
import { useWithdrawalAddressesRouter } from 'app/pages/accounts/pages/withdrawalAddresses/router'
import { WithdrawalAddressCreate } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WithdrawalAddressCreate'
import { WithdrawalAddressView } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressView/WithdrawalAddressView'

export const WithdrawalAddressesList: React.FC = () => {
  const {
    paths: withdrawalAddressesPaths,
    current
  } = useWithdrawalAddressesRouter()

  const isViewOpen = current.path === withdrawalAddressesPaths.view
  const isCreateOpen = current.path === withdrawalAddressesPaths.create

  return (
    <>
      <Grid container direction='column'>
        <Grid item>
          <Grid item container xs={12} justify='flex-end'>
            <Button
              component={AppRouterLinkComponent}
              to={withdrawalAddressesPaths.create}
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
      <WithdrawalAddressView isOpen={isViewOpen} />
      <WithdrawalAddressCreate isOpen={isCreateOpen} />
    </>
  )
}
