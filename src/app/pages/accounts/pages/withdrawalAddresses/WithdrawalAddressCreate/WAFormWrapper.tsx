import React from 'react'
import { Grid } from '@material-ui/core'
import { Submit } from 'components/form/Submit'
import { WithdrawalAddressForm } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAForm'
import { WAFormFields } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAFormFields'
import { WADialogActions } from 'app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogActions'

export const WAFormWrapper = () => {
  return (
    <WithdrawalAddressForm defaultValues={{ agree: false }}>
      <Grid container direction='column' spacing={3}>
        <WAFormFields />
        <WADialogActions>
          <Grid item container justify='center'>
            <Submit color='primary' variant='contained'>
              Submit
            </Submit>
          </Grid>
        </WADialogActions>
      </Grid>
    </WithdrawalAddressForm>
  )
}
