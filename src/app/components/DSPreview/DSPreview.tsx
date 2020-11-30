import React from 'react'
import { Grid } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { useDSRouter } from 'app/pages/accounts/pages/digitalSecurities/router'
import { useBalancesByType } from 'hooks/balance/useBalancesByType'

export const DSPreview = () => {
  const { params } = useDSRouter()
  const { data, isLoading } = useBalancesByType('Security')
  const balance = data.map[params.balanceId]

  if (isLoading) {
    return null
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <LabelledValue label='Digital Security Name' value={balance.name} />
      </Grid>

      <Grid item xs={4}>
        <LabelledValue label='Symbol' value={balance.symbol} />
      </Grid>
    </Grid>
  )
}
