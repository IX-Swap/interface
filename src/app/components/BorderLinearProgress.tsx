import React from 'react'
import { LinearProgress, LinearProgressProps } from '@mui/material'
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
