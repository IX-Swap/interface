import { Grid } from '@mui/material'
import { VirtualAccountDetails } from 'app/pages/accounts/components/VirtualAccountDetails'
import { VirtualAccountSelect } from 'app/pages/accounts/components/VirtualAccountSelect'
import React from 'react'

export interface CashDepositVirtualAccountDetailsProps {
  selectedAccount?: string
  defaultValue: string
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void
}

export const CashDepositVirtualAccountDetails = ({
  selectedAccount,
  handleChange,
  defaultValue
}: CashDepositVirtualAccountDetailsProps) => {
  return (
    <Grid container spacing={3}>
      {selectedAccount === undefined && defaultValue === undefined ? null : (
        <Grid item xs={12}>
          <VirtualAccountDetails
            virtualAccountId={selectedAccount ?? defaultValue}
            showAddForm
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <VirtualAccountSelect
          customLabel='Choose Account For Cash Deposit'
          onChange={handleChange}
          defaultValue={defaultValue}
        />
      </Grid>
    </Grid>
  )
}
