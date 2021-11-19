import React from 'react'
import { WithdrawalAddressForm } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAForm'
import { WABaseFields } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WABaseFields'
import { WAFormContent } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAFormContent'
import { Grid } from '@material-ui/core'

export interface WAFormWrapperProps {
  onLinkClick: () => void
}

export const WAFormWrapper = ({ onLinkClick }: WAFormWrapperProps) => {
  return (
    <WithdrawalAddressForm defaultValues={{ agree: false }}>
      <Grid container direction='column' spacing={3}>
        <WABaseFields />
        <WAFormContent onLinkClick={onLinkClick} />
      </Grid>
    </WithdrawalAddressForm>
  )
}
