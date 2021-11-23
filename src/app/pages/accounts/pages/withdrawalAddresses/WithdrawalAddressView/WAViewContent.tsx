import React from 'react'
import { Grid, LinearProgress } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { useWithdrawalAddressById } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddressById'
import { useParams } from 'react-router-dom'

export const WAViewContent = () => {
  const params = useParams<{ withdrawalAddressId: string }>()
  const { data, isSuccess } = useWithdrawalAddressById(
    params.withdrawalAddressId
  )

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
          <LabelledValue label='Blockchain Address' value={data.address} />
        </Grid>
        <Grid item xs={8}>
          <LabelledValue label='Memo' value={data.memo} />
        </Grid>
      </Grid>
    </>
  )
}
