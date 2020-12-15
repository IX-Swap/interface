import React from 'react'
import { Grid, LinearProgress } from '@material-ui/core'
import { useWithdrawalAddressesRouter } from 'app/pages/accounts/pages/withdrawalAddresses/router'
import { LabelledValue } from 'components/LabelledValue'
import { useWithdrawalAddressById } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddressById'

export const WAViewContent = () => {
  const {
    params: { withdrawalAddressId }
  } = useWithdrawalAddressesRouter()
  const { data, isSuccess } = useWithdrawalAddressById(withdrawalAddressId)

  if (!isSuccess || data === undefined) {
    return <LinearProgress />
  }

  return (
    <>
      <Grid container direction='column' justify='center' spacing={3}>
        <Grid item xs={8}>
          <LabelledValue label='Blockchain Network' value={data.network.name} />
        </Grid>
        <Grid item xs={8}>
          <LabelledValue label='Address Label' value={data.label} />
        </Grid>
        <Grid item xs={8}>
          <LabelledValue label='Withdrawal Address' value={data.address} />
        </Grid>
        <Grid item xs={8}>
          <LabelledValue label='Memo' value={data.memo} />
        </Grid>
      </Grid>
    </>
  )
}
