import React from 'react'
import { LinearProgress, LinearProgressProps } from '@material-ui/core'
import useStyles from './BorderLinearProgress.styles'

export interface ColoredLinearProgressProps extends LinearProgressProps {
  classes: any
}

export const BorderLinearProgress = (props: ColoredLinearProgressProps) => {
  const { classes, ...rest } = props
  const styles = useStyles()

  return (
    <LinearProgress
      {...rest}
      variant='determinate'
      classes={{
        ...styles,
        ...classes
      }}
    />
  )
}
