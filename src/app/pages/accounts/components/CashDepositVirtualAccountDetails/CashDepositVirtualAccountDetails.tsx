import { FormControl, Grid, InputLabel, Typography } from '@material-ui/core'
import { VirtualAccountDetails } from 'app/pages/accounts/components/VirtualAccountDetails'
import { VirtualAccountSelect } from 'app/pages/accounts/components/VirtualAccountSelect'
import { VSpacer } from 'components/VSpacer'
import React from 'react'

export interface CashDepositVirtualAccountDetailsProps {
  selectedAccount?: string
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void
}

export const CashDepositVirtualAccountDetails = ({
  selectedAccount,
  handleChange
}: CashDepositVirtualAccountDetailsProps) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item xs={12} sm={4}>
        <Typography variant='subtitle1'>
          Choose Your Virtual Account Number
        </Typography>
        <VSpacer size='small' />
        <FormControl fullWidth variant='outlined'>
          <InputLabel shrink>Virtual Accounts</InputLabel>
          <VirtualAccountSelect onChange={handleChange} />
        </FormControl>
      </Grid>
      <Grid item>
        {selectedAccount !== undefined ? (
          <VirtualAccountDetails virtualAccountId={selectedAccount} />
        ) : null}
      </Grid>
    </Grid>
  )
}
