import { Grid } from '@material-ui/core'
import { AvailableBalanceInfo } from 'app/pages/accounts/components/VirtualAccountCard/AvailableBalanceInfo'
import { VirtualAccountCard } from 'app/pages/accounts/components/VirtualAccountCard/VirtualAccountCard'
import { VirtualAccountNumberInfo } from 'app/pages/accounts/components/VirtualAccountCard/VirtualAccountNumberInfo'
import { useVirtualAccountByUserId } from 'app/pages/accounts/hooks/useVirtualAccountByUserId'
import React from 'react'

export interface VirtualAccountDetailsProps {
  virtualAccountId?: string
}

export const VirtualAccountDetails = ({
  virtualAccountId
}: VirtualAccountDetailsProps) => {
  const { data, isLoading } = useVirtualAccountByUserId(virtualAccountId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        <VirtualAccountCard
          label={data.user.name}
          info={
            <VirtualAccountNumberInfo
              accountNumber={data.accountNumber}
              currency={data.currency}
            />
          }
        />
      </Grid>
      <Grid item>
        <VirtualAccountCard
          label='Available Balance'
          info={
            <AvailableBalanceInfo
              currency={data.currency}
              amount={data.balance.available}
            />
          }
        />
      </Grid>
    </Grid>
  )
}
