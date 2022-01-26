import { Grid } from '@mui/material'
import { VirtualAccountCard } from 'app/pages/accounts/components/VirtualAccountCard/VirtualAccountCard'
import { VirtualAccountNumberInfo } from 'app/pages/accounts/components/VirtualAccountCard/VirtualAccountNumberInfo'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { AutoAssignVirtualAccountForm } from 'app/pages/accounts/pages/banks/components/AutoAssignVirtualAccountForm/AutoAssignVirtualAccountForm'
import React from 'react'

export interface VirtualAccountDetailsProps {
  virtualAccountId?: string
  showAddForm?: boolean
}

export const VirtualAccountDetails = ({
  virtualAccountId,
  showAddForm = false
}: VirtualAccountDetailsProps) => {
  const { data, list, isLoading } = useVirtualAccount(virtualAccountId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container spacing={3}>
      <Grid item>
        <VirtualAccountCard
          label={data.user.name}
          info={
            <VirtualAccountNumberInfo
              accountNumber={data.accountNumber}
              currency={data.currency}
              availableBalance={data.balance.available}
              onHold={data.balance.onHold}
            />
          }
        />
      </Grid>
      {showAddForm ? (
        <Grid item>
          <AutoAssignVirtualAccountForm isAdditional={list?.length === 1} />
        </Grid>
      ) : null}
    </Grid>
  )
}
