import { Box } from '@mui/material'
import { Skeleton } from '@mui/material';
import React from 'react'

export const DSOCardWrapperSkeleton = () => (
  <Box height={112} p={2.5}>
    <Box display='flex' mb={1}>
      <Skeleton
        style={{ marginRight: 10 }}
        variant="rectangular"
        height={25}
        width={25}
      />
      <Skeleton width={120} height={23} />
    </Box>
    <Skeleton width={60} height={30} />
  </Box>
)
