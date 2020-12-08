import React from 'react'
import { DigitalSecurityOffering, DSOInsight } from 'types/dso'
import { RaisedProgressBar } from './RaisedProgressBar'
import { formatDistanceToNow, compareAsc } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const useStyle = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: `${theme.spacing(0.5)}px`
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

  if (typeof insight === 'undefined' || typeof dso === 'undefined') {
    return null
  }

  const percent =
    (insight.raisedTotal / (dso.totalFundraisingAmount ?? 1)) * 100
  const launchDate = new Date(dso.launchDate)
  const compare = compareAsc(launchDate, Date.now())

  return (
    <Box className={container}>
      {compare < 0 ? (
        <RaisedProgressBar
          progress={percent}
        /> /* TODO: Replace with Varun's Progress Bar */
      ) : (
        <Box>Upcomming</Box>
      )}
      <Box className={date}>
        {formatDistanceToNow(launchDate, { addSuffix: true })}
      </Box>
    </Box>
  )
}
