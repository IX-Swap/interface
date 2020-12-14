import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { VSpacer } from 'components/VSpacer'
import { useCountdown } from '../hooks/useCountdown'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'

export const CountdownTimer = () => {
  const theme = useTheme()

  const {
    params: { dsoId }
  } = useIssuanceRouter()

  const { data } = useDSOById(dsoId)

  const launchDate = data !== undefined ? data.launchDate : undefined
  const result = useCountdown(launchDate)

  if (data === undefined) {
    return null
  }

  return (
    <Grid
      container
      alignItems='center'
      justify='center'
      direction='column'
      style={{
        maxWidth: '150px',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
      }}
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
