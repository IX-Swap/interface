import React from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { useBalancesByType } from 'hooks/balance/useBalancesByType'

export const DSPreview = () => {
  const { data, isLoading } = useBalancesByType('Security')
  const params = useParams<{ balanceId: string }>()

  if (isLoading || params.balanceId === undefined) {
    return null
  }

  const balance = data.map[params.balanceId]

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
