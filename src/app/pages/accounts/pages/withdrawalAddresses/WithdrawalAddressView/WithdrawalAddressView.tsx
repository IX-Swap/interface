import React from 'react'
import { Grid, Button, DialogActions } from '@material-ui/core'
import { WADialog } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialog'
import { WADialogTitle } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialogTitle'
import { WADialogContent } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialogContent'
import { WAViewContent } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressView/WAViewContent'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { useHistory } from 'react-router-dom'

export const WithdrawalAddressView = () => {
  const { replace } = useHistory()

  return (
    <WADialog open>
      <WADialogTitle label='View Withdrawal Address' />
      <WADialogContent>
        <WAViewContent />
      </WADialogContent>
      <DialogActions>
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
      </DialogActions>
    </WADialog>
  )
}
