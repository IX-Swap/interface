import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useCountdown } from 'app/pages/issuance/hooks/useCountdown'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { TimeDisplay } from 'app/pages/issuance/components/CountdownTimer/TimeDisplay'
import { getTimeUnitsToDisplay, getEndDate } from 'helpers/countdownTimer'

export const CountdownTimer = () => {
  const {
    params: { dsoId }
  } = useIssuanceRouter()

  const { data } = useDSOById(dsoId)
  const { units } = useCountdown(getEndDate(data))

  const unitsToDisplay = getTimeUnitsToDisplay(units)

  if (data === undefined) {
    return null
  }

  return (
    <Box my={4} mx='auto'>
      <Grid container alignItems='center' justify='center' direction='column'>
        <Typography>Time Remaining</Typography>
        <VSpacer size='small' />
        <TimeDisplay unitsToDisplay={unitsToDisplay} units={units} />
      </Grid>
    </Box>
  )
}
