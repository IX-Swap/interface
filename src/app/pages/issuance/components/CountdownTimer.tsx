import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useCountdown } from '../hooks/useCountdown'

export interface CountdownTimerProps {
  launchDate: Date | undefined
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  launchDate
}: CountdownTimerProps) => {
  const result = useCountdown(launchDate)
  if (typeof launchDate === 'undefined') {
    return null
  }
  return (
    <Grid
      container
      alignItems='center'
      justify='center'
      direction='column'
      style={{ maxWidth: '150px' }}
    >
      <Typography>Time Remaining</Typography>
      <VSpacer size='small' />
      <Grid container alignItems='center' justify='space-between'>
        <Typography variant='h4' align='left'>
          {result.days ?? 0}
        </Typography>
        <Typography variant='h4'>:</Typography>
        <Typography variant='h4' align='center'>
          {result.hours ?? 0}
        </Typography>
        <Typography variant='h4'>:</Typography>
        <Typography variant='h4' align='right'>
          {result.minutes ?? 0}
        </Typography>
      </Grid>
      <VSpacer size='small' />
      <Grid container alignItems='center' justify='space-between'>
        <Typography>DAYS</Typography>
        <Typography>HOURS</Typography>
        <Typography>MINS</Typography>
      </Grid>
    </Grid>
  )
}
