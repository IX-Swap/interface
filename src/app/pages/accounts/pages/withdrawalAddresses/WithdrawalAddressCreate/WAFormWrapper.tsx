import React from 'react'
import { WithdrawalAddressForm } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAForm'
import { WABaseFields } from './WABaseFields'
import { WAFormContent } from './WAFormContent'
import { Grid } from '@material-ui/core'

export const WAFormWrapper = () => {
  return (
    <WithdrawalAddressForm defaultValues={{ agree: false }}>
      <Grid container direction='column' spacing={3}>
        <WABaseFields />
        <WAFormContent />
      </Grid>
    </WithdrawalAddressForm>
  )
}
