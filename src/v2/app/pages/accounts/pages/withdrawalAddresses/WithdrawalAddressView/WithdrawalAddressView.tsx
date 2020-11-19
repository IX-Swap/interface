import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { history } from 'v2/history'
import { WADialog } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialog'
import { WADialogTitle } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogTitle'
import { WADialogContent } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogContent'
import { WADialogActions } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogActions'
import { WAViewContent } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressView/WAViewContent'

export const WithdrawalAddressView = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <WADialog open={isOpen}>
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
            onClick={history.goBack}
          >
            Ok
          </Button>
        </Grid>
      </WADialogActions>
    </WADialog>
  )
}
