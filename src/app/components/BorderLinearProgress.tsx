import React from 'react'
import { LinearProgress, LinearProgressProps } from '@material-ui/core'
import useStyles from './BorderLinearProgress.styles'

export interface ColoredLinearProgressProps extends LinearProgressProps {
  barColorPrimary?: string
  colorPrimary?: string
}

export const BorderLinearProgress = (props: ColoredLinearProgressProps) => {
  const classes = useStyles()
  const barColorPrimary = props.barColorPrimary ?? classes.barColorPrimary
  const colorPrimary = props.colorPrimary ?? classes.colorPrimary

  return (
    <LinearProgress
      {...props}
      classes={{
        ...classes,
        barColorPrimary,
        colorPrimary
      }}
    />
  )
}
