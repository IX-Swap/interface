import { Box, Grid } from '@mui/material'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { NoData } from 'app/components/NoData/NoData'
import {
  Security,
  SecurityCard
} from 'app/pages/educationCentre/components/Securities/SecurityCard'
import React from 'react'

export interface SecuritiesGridProps {
  data?: Security[]
  isLoading?: boolean
}

export const SecuritiesGrid = ({
  data,
  isLoading = false
}: SecuritiesGridProps) => {
  if (isLoading) {
    return (
      <Box width='100%' height='100%' position='relative' paddingTop={24}>
        <LoadingIndicator />
      </Box>
    )
  }

  if (data === undefined) {
    return null
  }

  if (data.length < 1) {
    return <NoData title='No data found' />
  }

  return (
    <Grid container spacing={2}>
      {data.map(item => (
        <Grid item xs={12} md={6} xl={4} key={item.ticker}>
          <SecurityCard {...item} />
        </Grid>
      ))}
    </Grid>
  )
}
