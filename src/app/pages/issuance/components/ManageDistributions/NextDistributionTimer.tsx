import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useCountdown } from 'app/pages/issuance/hooks/useCountdown'
import { TimeDisplay } from 'app/pages/issuance/components/CountdownTimer/TimeDisplay'
import { getTimeUnitsToDisplay } from 'helpers/countdownTimer'
import { useNextDistribution } from 'app/pages/issuance/hooks/useNextDistribution'
import { useParams } from 'react-router-dom'

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
  const { dsoId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data, isLoading } = useNextDistribution(dsoId)
  const soonest = data?.distributionDate

  const { units } = useCountdown(soonest)

  const unitsToDisplay = getTimeUnitsToDisplay(units)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Box my={my} mx={mx} style={{ width: 'max-content' }}>
      <Grid
        container
        alignItems='center'
        justifyContent='center'
        direction='column'
      >
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
