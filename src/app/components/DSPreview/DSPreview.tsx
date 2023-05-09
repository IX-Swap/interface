import React from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import { useBalancesByType } from 'hooks/balance/useBalancesByType'
import { FieldGrid } from 'ui/FieldGrid/FieldGrid'

export const DSPreview = () => {
  const { data, isLoading } = useBalancesByType('Security')
  const params = useParams<{ balanceId: string }>()

  if (isLoading || params.balanceId === undefined) {
    return null
  }

  const balance = data.map[params.balanceId]

  const items = [
    {
      label: 'Security Token Name',
      value: balance.name
    },
    {
      label: 'Symbol',
      value: balance.symbol
    }
  ]

  return (
    <Grid container pt={3} pl={3}>
      <Grid item xs={12}>
        <FieldGrid items={items} />
      </Grid>
    </Grid>
  )
}
