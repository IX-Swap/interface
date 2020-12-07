import React from 'react'
import { Box, LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export interface RaisedProgressBarProps {
  progress: number
}

const useStyles = makeStyles((theme) => ({
  progressBar: {
    width: '107px',
    borderRadius: '5px',
    height: '9px',
    backgroundColor: theme.palette.secondary.main,
    '& > div': {
      backgroundColor: ({ progress }: RaisedProgressBarProps) => {
        return progress >= 100 ? theme.palette.success.main : theme.palette.info.main
      }
    }
  },
  percent: {
    color: ({ progress }: RaisedProgressBarProps) => {
      return progress >= 100 ? theme.palette.success.main : theme.palette.info.main
    },
    marginBottom: `${theme.spacing(.5)}px`
  }
}))

export const RaisedProgressBar: React.FC<RaisedProgressBarProps> = (
  props: RaisedProgressBarProps
) => {
  const { progressBar, percent } = useStyles(props)
  return (
    <Box data-testid='progress-bar'>
      <Box className={percent}>{props.progress.toFixed(0)}%</Box>
      <LinearProgress
        className={progressBar}
        variant='determinate'
        value={props.progress > 100 ? 100 : props.progress}
      />
    </Box>
  )
}
