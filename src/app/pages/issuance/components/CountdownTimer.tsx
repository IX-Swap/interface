import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useCountdown } from '../hooks/useCountdown'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'

export const CountdownTimer = () => {
  const {
    params: { dsoId }
  } = useIssuanceRouter()

  const { data } = useDSOById(dsoId)

  const launchDate = data !== undefined ? data.launchDate : undefined
  const result = useCountdown(launchDate)

  if (data === undefined) {
    return null
  }

  // TODO: fix according to the design
  return (
    <Box my={4} mx='auto'>
      <Grid container alignItems='center' justify='center' direction='column'>
        <Typography>Time Remaining</Typography>
        <VSpacer size='small' />
        <Grid container alignItems='center' justify='space-between'>
          <Typography variant='h4' align='left'>
            {result.days ?? 0}
          </Typography>
          <Box px={1.25}>
            <Typography variant='h4'>:</Typography>
          </Box>
          <Typography variant='h4' align='center'>
            {result.hours ?? 0}
          </Typography>
          <Box px={1.25}>
            <Typography variant='h4'>:</Typography>
          </Box>
          <Typography variant='h4' align='right'>
            {result.minutes ?? 0}
          </Typography>
        </Grid>
        <VSpacer size='small' />
        <Grid container alignItems='center' justify='space-between'>
          <Typography>DAYS</Typography>
          <Box px={1.25} />
          <Typography>HOURS</Typography>
          <Box px={1.25} />
          <Typography>MINS</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
