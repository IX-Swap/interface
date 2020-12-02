import React from 'react'
import { withStyles, Theme } from '@material-ui/core/styles'
import { LinearProgress, LinearProgressProps } from '@material-ui/core'

export interface ColoredLinearProgressProps extends LinearProgressProps {
  classes: {
    [T in keyof ReturnType<typeof styles>]: string
  }
  barColorPrimary?: string
}

const ColoredLinearProgress = (props: ColoredLinearProgressProps) => {
  const { classes, barColorPrimary } = props
  return (
    <LinearProgress
      {...props}
      classes={{
        ...classes,
        barColorPrimary: barColorPrimary ?? classes.barColorPrimary
      }}
    />
  )
}

const styles = (theme: Theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
  },
  bar: {
    borderRadius: 5
  },
  barColorPrimary: {
    backgroundColor: theme.palette.primary.main
  }
})

export const BorderLinearProgress = withStyles(styles)(ColoredLinearProgress)
