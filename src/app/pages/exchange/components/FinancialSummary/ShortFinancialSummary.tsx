import { Box, Grid } from '@mui/material'
import { useFinancialSummary } from 'app/pages/exchange/hooks/useFinancialSummary'
import React from 'react'
import { useParams } from 'react-router-dom'
import { PairListDropdown } from '../PairListDropdown/PairListDropdown'

export const ShortFinancialSummary = () => {
  const { pairId } = useParams<{
    pairId: string
  }>()
  const { data } = useFinancialSummary(pairId)
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <Box
          display='flex'
          justifyContent={{ xs: 'space-between', md: 'flex-start' }}
          alignItems='flex-start'
          padding={1}
        >
          <Box flexGrow={1} width={{ xs: '50%', md: '100%' }}>
            <PairListDropdown pairName={data?.name} hideDropdown />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={7}></Grid>
    </Grid>
  )
}
