import React from 'react'
import { Box, Typography, Grid } from '@material-ui/core'
import { TimeUnit } from 'app/pages/issuance/components/CountdownTimer/TimeUnit'
import { UnitMap } from 'app/pages/issuance/hooks/useCountdown'

export interface TimeDisplayProps {
  unitsToDisplay: string[]
  units: UnitMap
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({
  unitsToDisplay,
  units
}: TimeDisplayProps) => {
  return (
    <Grid container alignItems='flex-start' justify='space-between'>
      {unitsToDisplay.map((unit, i) => (
        <React.Fragment key={unit}>
          <TimeUnit time={units[unit]} label={unit} />
          {i < unitsToDisplay.length - 1 ? (
            <Box>
              <Typography variant='h3'>:</Typography>
            </Box>
          ) : null}
        </React.Fragment>
      ))}
    </Grid>
  )
}
