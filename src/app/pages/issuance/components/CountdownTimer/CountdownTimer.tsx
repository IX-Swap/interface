import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useCountdown } from 'app/pages/issuance/hooks/useCountdown'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { TimeDisplay } from 'app/pages/issuance/components/CountdownTimer/TimeDisplay'
import { getTimeUnitsToDisplay, getEndDate } from 'helpers/countdownTimer'
import { useParams } from 'react-router-dom'

export interface CountdownTimerProps {
  my?: number
  mx?: number | string
  isNewThemeOn?: boolean
}

export const CountdownTimer = ({
  my = 4,
  mx = 'auto',
  isNewThemeOn = false
}: CountdownTimerProps) => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data } = useDSOById(dsoId, issuerId)
  const { units } = useCountdown(getEndDate(data))

  const unitsToDisplay = getTimeUnitsToDisplay(
    !isNewThemeOn
      ? units
      : { years: 0, months: 0, days: 1, hours: 1, minutes: 1, seconds: 0 }
  )

  if (data === undefined) {
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
          Time Remaining
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
