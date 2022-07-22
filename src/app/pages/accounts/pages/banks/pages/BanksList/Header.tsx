import { Grid } from '@mui/material'
import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'
import { AddBankAccountButton } from 'app/pages/accounts/pages/withdraw/components/AddBankAccountButton'
import React from 'react'

export const Header = () => {
  return (
    <Grid item container xs={12} justifyContent='flex-end'>
      <TwoFADialogWrapper>
        <AddBankAccountButton variant='contained' />
      </TwoFADialogWrapper>
    </Grid>
  )
}
