import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

export interface DataroomHeaderProps {
  hasSelected?: boolean
}

export const DataroomHeader = (props: DataroomHeaderProps) => {
  return (
    <Grid container alignItems='flex-start' wrap='nowrap'>
      <Box flex='1 0 40%'>
        <Typography style={{ fontWeight: 500 }}>File</Typography>
      </Box>
      <Box flex='1 0 20%'>
        <Typography style={{ fontWeight: 500 }}>Type</Typography>
      </Box>
      <Box flex='1 0 20%'>
        <Typography style={{ fontWeight: 500 }}>Uploaded At</Typography>
      </Box>
      <Box flex='1 0 20%' />
    </Grid>
  )
}
