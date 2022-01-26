import React from 'react'
import { Box, Grid } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles';
import { getTimeFromNow } from 'helpers/dates'
import { getDSOStats } from 'app/components/DSO/utils'
import { DigitalSecurityOffering, DSOInsight } from 'types/dso'
import { DSOProgressBar } from 'app/components/DSO/components/DSOProgressBar'

const useStyle = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: theme.spacing(0.5)
  },
  date: {
    fontSize: `${theme.typography.fontSize}px`,
    color: theme.palette.text.hint
  }
}))

export interface DSORaisedProps {
  insight: DSOInsight
  dso: DigitalSecurityOffering
}

export const DSORaised: React.FC<DSORaisedProps> = ({
  insight,
  dso
}: DSORaisedProps) => {
  const { container, date } = useStyle()
  const launchDate = new Date(dso.launchDate)
  const { status, color, percentRaised } = getDSOStats(dso)

  if (typeof insight === 'undefined' || typeof dso === 'undefined') {
    return null
  }

  return (
    <Box className={container}>
      {status !== 'upcoming' ? (
        <Grid container direction='column'>
          <Box style={{ color }}>{percentRaised.toFixed(0)}%</Box>
          <DSOProgressBar dso={dso} />
        </Grid>
      ) : (
        <Grid container direction='column'>
          <Box>Upcoming</Box>
        </Grid>
      )}
      <Box className={date}>{getTimeFromNow(launchDate)}</Box>
    </Box>
  )
}
