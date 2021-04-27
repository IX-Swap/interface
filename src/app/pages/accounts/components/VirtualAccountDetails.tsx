import { Grid } from '@material-ui/core'
import { AvailableBalanceInfo } from 'app/pages/accounts/components/VirtualAccountCard/AvailableBalanceInfo'
import { VirtualAccountCard } from 'app/pages/accounts/components/VirtualAccountCard/VirtualAccountCard'
import { VirtualAccountNumberInfo } from 'app/pages/accounts/components/VirtualAccountCard/VirtualAccountNumberInfo'
import { useVirtualAccountByUserId } from 'app/pages/accounts/hooks/useVirtualAccountByUserId'
import React from 'react'

export const VirtualAccountDetails = () => {
  const { data, isLoading } = useVirtualAccountByUserId()

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        <VirtualAccountCard
          label={data[0].user.name}
          info={
            <VirtualAccountNumberInfo
              accountNumber={data[0].accountNumber}
              currency={data[0].currency}
            />
          }
        />
      </Grid>
      {data.map(virtualAccount => (
        <Grid item key={virtualAccount._id}>
          <VirtualAccountCard
            label='Available Balance'
            info={
              <AvailableBalanceInfo
                currency={virtualAccount.currency}
                amount={virtualAccount.balance.available}
              />
            }
          />
        </Grid>
      ))}
    </Grid>
  )
}
