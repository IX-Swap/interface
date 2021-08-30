import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useCountdown } from 'app/pages/issuance/hooks/useCountdown'
import { TimeDisplay } from 'app/pages/issuance/components/CountdownTimer/TimeDisplay'
import { getTimeUnitsToDisplay } from 'helpers/countdownTimer'

export interface CountdownTimerProps {
  my?: number
  mx?: number | string
  isNewThemeOn?: boolean
}

export const NextDistributionTimer = ({
  my = 4,
  mx = 'auto',
  isNewThemeOn = false
}: CountdownTimerProps) => {
  // Replace with actual data when backend is ready
  var date = new Date()
  date.setDate(date.getDate() + 21)

  const { units } = useCountdown(date.toDateString())

  const unitsToDisplay = getTimeUnitsToDisplay(
    !isNewThemeOn
      ? units
      : { years: 0, months: 0, days: 1, hours: 1, minutes: 1, seconds: 0 }
  )

  return (
    <Box my={my} mx={mx} style={{ width: 'max-content' }}>
      <Grid container alignItems='center' justify='center' direction='column'>
        <Typography style={{ fontWeight: isNewThemeOn ? 500 : 'initial' }}>
          Next Distribution
        </Typography>
        <VSpacer size={'small'} />
        <TimeDisplay
          unitsToDisplay={unitsToDisplay}
          units={units}
          isNewThemeOn={isNewThemeOn}
        />
      </Grid>
    </Box>
  )
}
