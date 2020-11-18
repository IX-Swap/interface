import React from 'react'
import { Grid } from '@material-ui/core'
import { WithdrawalAddressForm } from './WAForm'
import { WAFormSubmitButton } from './WAFormSubmitButton'
import { WAFormFields } from './WAFormFields'
import { WADialogActions } from '../WADialog/WADialogActions'

export const WAFormWrapper = () => {
  return (
    <WithdrawalAddressForm defaultValues={{ agree: false }}>
      <Grid container direction='column' spacing={3}>
        <WAFormFields />
        <WADialogActions>
          <Grid item container justify='center'>
            <WAFormSubmitButton />
          </Grid>
        </WADialogActions>
      </Grid>
    </WithdrawalAddressForm>
  )
}
