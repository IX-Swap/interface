import { Box, Grid, Tooltip, Typography } from '@material-ui/core'
import React from 'react'

export interface FundraiseTooltipProps {
  children: JSX.Element
  target: string
  raised: string
}

export const FundraiseTooltip = ({
  children,
  target,
  raised
}: FundraiseTooltipProps) => {
  return (
    <Tooltip
      style={{ color: '#FFF' }}
      placement='bottom-start'
      arrow
      title={
        <Box p={1} maxWidth={140}>
          <Grid
            container
            spacing={1}
            justifyContent='center'
            direction='column'
          >
            <Grid item>
              <Typography variant='caption'>
                <Box component='span' fontWeight='bold'>
                  Target Fundraise
                </Box>
              </Typography>
              <Box />
              <Typography variant='caption'>{target}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='caption'>
                <Box component='span' fontWeight='bold'>
                  Amount Raised
                </Box>
              </Typography>
              <Box />
              <Typography variant='caption'>{raised}</Typography>
            </Grid>
          </Grid>
        </Box>
      }
    >
      {children}
    </Tooltip>
  )
}
