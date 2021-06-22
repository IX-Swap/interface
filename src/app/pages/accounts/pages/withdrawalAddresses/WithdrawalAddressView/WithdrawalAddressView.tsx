import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { WADialog } from 'app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialog'
import { WADialogTitle } from 'app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogTitle'
import { WADialogContent } from 'app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogContent'
import { WADialogActions } from 'app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogActions'
import { WAViewContent } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressView/WAViewContent'
import { WithdrawalAddressesRoute } from '../router/config'
import { useHistory } from 'react-router-dom'

export const WithdrawalAddressView = () => {
  const { replace } = useHistory()

  return (
    <WADialog open>
      <WADialogTitle label='View Withdrawal Address' />
      <WADialogContent>
        <WAViewContent />
      </WADialogContent>
      <WADialogActions>
        <Grid container xs={12} justify='center'>
          <Button
            variant='contained'
            color='primary'
            disableElevation
            onClick={() => replace(WithdrawalAddressesRoute.list)}
          >
            Ok
          </Button>
        </Grid>
      </WADialogActions>
    </WADialog>
  )
}
