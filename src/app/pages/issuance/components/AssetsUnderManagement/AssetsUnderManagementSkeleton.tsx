import { Skeleton } from '@material-ui/lab'
import { Box } from '@material-ui/core'
import React from 'react'
import { InsightCard } from '../InsightCard'
import { ChartWrapper } from '../IssuanceLanding/ChartWrapper'

export const AssetsUnderManagementSkeleton = () => {
  return (
    <InsightCard>
      <ChartWrapper title={<Skeleton width={240} />}>
        <Box mt={2.5} display='flex' justifyContent='space-around'>
          <Skeleton variant='circle' width={180} height={180} />
          <Box>
            <Box display='flex' mb={0.5}>
              <Skeleton
                variant='circle'
                width={14}
                height={14}
                style={{ marginRight: 4 }}
              />
              <Skeleton width={50} />
            </Box>
            <Box display='flex' mb={0.5}>
              <Skeleton
                variant='circle'
                width={14}
                height={14}
                style={{ marginRight: 4 }}
              />
              <Skeleton width={90} />
            </Box>
            <Box display='flex' mb={0.5}>
              <Skeleton
                variant='circle'
                width={14}
                height={14}
                style={{ marginRight: 4 }}
              />
              <Skeleton width={80} />
            </Box>
            <Box display='flex' mb={0.5}>
              <Skeleton
                variant='circle'
                width={14}
                height={14}
                style={{ marginRight: 4 }}
              />
              <Skeleton width={100} />
            </Box>
            <Box display='flex' mb={0.5}>
              <Skeleton
                variant='circle'
                width={14}
                height={14}
                style={{ marginRight: 4 }}
              />
              <Skeleton width={60} />
            </Box>
          </Box>
        </Box>
      </ChartWrapper>
    </InsightCard>
  )
}
