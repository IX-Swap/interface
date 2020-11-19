import React from 'react'
import { Grid } from '@material-ui/core'
import { Submit } from 'v2/components/form/Submit'
import { WithdrawalAddressForm } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAForm'
import { WAFormFields } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAFormFields'
import { WADialogActions } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogActions'

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
