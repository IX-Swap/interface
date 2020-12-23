import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { BorderLinearProgress } from 'app/components/BorderLinearProgress'
import useStyles from './DSOProgressBar.styles'
import { getDSOStats } from 'app/components/DSO/utils'

export interface DSOProgressBarProps {
  dso: DigitalSecurityOffering
}

export const DSOProgressBar = (props: DSOProgressBarProps) => {
  const { dso } = props
  const { color, percentRaised } = getDSOStats(dso)

  const classes = useStyles({ color })

  return <BorderLinearProgress value={percentRaised} classes={classes} />
}
