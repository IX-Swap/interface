import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useCountdown } from 'app/pages/issuance/hooks/useCountdown'
import { TimeDisplay } from 'app/pages/issuance/components/CountdownTimer/TimeDisplay'
import { getTimeUnitsToDisplay } from 'helpers/countdownTimer'
import { useDistribution } from 'app/pages/issuance/hooks/useDistribution'

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
  const { data, isLoading } = useDistribution()
  const soonest = data?.list[0]?.distributionDate

  const { units } = useCountdown(soonest)

  const unitsToDisplay = getTimeUnitsToDisplay(units)

  if (isLoading) {
    return null
  }

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
