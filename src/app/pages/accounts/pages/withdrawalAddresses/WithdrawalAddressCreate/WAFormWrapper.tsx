import React, { ReactElement } from 'react'
import { WithdrawalAddressForm } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAForm'
import { WABaseFields } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WABaseFields'
import { WAFormContent } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAFormContent'
import { Grid } from '@material-ui/core'

export interface WAFormWrapperProps {
  hint: ReactElement
}

export const WAFormWrapper = ({ hint }: WAFormWrapperProps) => {
  return (
    <WithdrawalAddressForm defaultValues={{ agree: false }}>
      <Grid container direction='column' spacing={3}>
        <WABaseFields />
        <WAFormContent hint={hint} />
      </Grid>
    </WithdrawalAddressForm>
  )
}
