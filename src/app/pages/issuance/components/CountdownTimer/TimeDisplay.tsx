import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { TimeUnit } from 'app/pages/issuance/components/CountdownTimer/TimeUnit'
import { UnitMap } from 'app/pages/issuance/hooks/useCountdown'

export interface TimeDisplayProps {
  unitsToDisplay: string[]
  units: UnitMap
  isNewThemeOn?: boolean
}

export const TimeDisplay = ({
  unitsToDisplay,
  units,
  isNewThemeOn = false
}: TimeDisplayProps) => {
  const getLabel = (label: string) => {
    if (isNewThemeOn && label === 'minutes') {
      return 'mins'
    }
    return label
  }
  return (
    <Grid container alignItems='flex-start' justifyContent='center'>
      {unitsToDisplay.map((unit, i) => (
        <React.Fragment key={unit}>
          <TimeUnit
            time={units[unit]}
            label={getLabel(unit)}
            isNewThemeOn={isNewThemeOn}
          />
          {i < unitsToDisplay.length - 1 && !isNewThemeOn ? (
            <Box>
              <Typography variant='h3'>:</Typography>
            </Box>
          ) : null}
          {isNewThemeOn && i < 2 ? (
            <Box data-testid='spacer' width={8} />
          ) : null}
        </React.Fragment>
      ))}
    </Grid>
  )
}
