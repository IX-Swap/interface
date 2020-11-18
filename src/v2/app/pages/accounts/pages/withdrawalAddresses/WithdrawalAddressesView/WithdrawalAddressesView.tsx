import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { WADialog } from '../WADialog/WADialog'
import { WADialogTitle } from '../WADialog/WADialogTitle'
import { WADialogContent } from '../WADialog/WADialogContent'
import { WADialogActions } from '../WADialog/WADialogActions'
import { history } from 'v2/history'
import { WithdrawalAddressesViewContent } from './WAViewContent'

export const WithdrawalAddressesView = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <WADialog open={isOpen}>
      <WADialogTitle label='View Withdrawal Address' />
      <WADialogContent>
        <WithdrawalAddressesViewContent />
      </WADialogContent>
      <WADialogActions>
        <Grid container xs={12} justify='center'>
          <Button
            variant='contained'
            color='primary'
            disableElevation
            onClick={() => history.goBack()}
          >
            Ok
          </Button>
        </Grid>
      </WADialogActions>
    </WADialog>
  )
}
