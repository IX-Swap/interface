import React from 'react'
import { Grid, Tooltip } from '@material-ui/core'
import { DigitalSecurityOffering } from 'types/dso'
import { BorderLinearProgress } from 'app/components/BorderLinearProgress'
import useStyles from './DSOProgressBar.styles'
import { getDSOStats } from 'app/components/DSO/utils'

export interface DSOProgressBarProps {
  dso: DigitalSecurityOffering
  showPercentRaised?: boolean
  showDSOStatus?: boolean
  showRemainingTime?: boolean
}

export const DSOProgressBar = (props: DSOProgressBarProps) => {
  const { dso } = props
  const { color, status, percentRaised } = getDSOStats(dso)

  const classes = useStyles(color)

  return (
    <Tooltip
      title={`${percentRaised}%`}
      aria-label={`${percentRaised}% raised`}
    >
      <div style={{ color: color }}>
        <Grid container justify='flex-end'>
          <Grid item>{status === 'live' ? 'Live' : <>&nbsp;</>}</Grid>
        </Grid>
        <BorderLinearProgress value={percentRaised} classes={classes} />
      </div>
    </Tooltip>
  )
}
