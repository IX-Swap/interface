import React from 'react'
import { Grid, Tooltip } from '@material-ui/core'
import { calculatePercent } from 'helpers/numbers'
import { DigitalSecurityOffering } from 'types/dso'
import { BorderLinearProgress } from 'app/components/BorderLinearProgress'
import { getTimeAgo } from 'helpers/dates'
import useStyles from './DSOProgressBar.styles'

export interface DSOProgressBarProps {
  dso: DigitalSecurityOffering
  showPercentRaised?: boolean
  showDSOStatus?: boolean
  showRemainingTime?: boolean
}

export const DSOProgressBar = (props: DSOProgressBarProps) => {
  const {
    dso,
    showPercentRaised = false,
    showDSOStatus = false,
    showRemainingTime = false
  } = props
  const classes = useStyles()

  const percentRaised = calculatePercent(
    dso.insight.raisedTotal,
    dso.totalFundraisingAmount ?? 0
  )

  const raisedText = `${Math.floor(percentRaised)} %`

  const now = new Date().getTime()
  const launchDate = new Date(dso.launchDate).getTime()
  const completionDate = now + 1

  const isLaunched = launchDate <= now
  const isCompleted = completionDate <= now || percentRaised === 100

  const isLive = !isCompleted && isLaunched

  const textColor = isLive
    ? classes.liveText
    : isCompleted
    ? classes.completedText
    : classes.errorText

  const bgColor = isLive
    ? classes.liveBg
    : isCompleted
    ? classes.completedBg
    : classes.errorBg

  return (
    <Tooltip title={raisedText} aria-label={`${raisedText} raised`}>
      <div className={textColor}>
        {(showPercentRaised || showDSOStatus) && (
          <Grid container justify='space-between'>
            <Grid item>{showPercentRaised && raisedText}</Grid>
            <Grid item>{showDSOStatus && isLive && 'Live'}</Grid>
          </Grid>
        )}
        <BorderLinearProgress
          variant='determinate'
          value={percentRaised}
          barColorPrimary={bgColor}
        />
        {showRemainingTime && (
          <Grid container justify='flex-start'>
            <Grid item>{getTimeAgo(dso.launchDate)}</Grid>
          </Grid>
        )}
      </div>
    </Tooltip>
  )
}
