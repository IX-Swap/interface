import React from 'react'
import { LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

export interface RaisedProgressBarProps {
  progress: number
}

const useStyles = makeStyles({
  progressBar: {
    width: '107px',
    borderRadius: '5px',
    height: '9px',
    backgroundColor: '#F7F7F7',
    '& > div': {
      backgroundColor: ({ progress }: RaisedProgressBarProps) => {
        return progress >= 100 ? '#5CC72A' : '#8995FC'
      }
    }
  },
  percent: {
    color: ({ progress }: RaisedProgressBarProps) => {
      return progress >= 100 ? '#5CC72A' : '#8995FC'
    },
    marginBottom: '8px'
  }
})

export const RaisedProgressBar: React.FC<RaisedProgressBarProps> = (
  props: RaisedProgressBarProps
) => {
  const { progressBar, percent } = useStyles(props)
  return (
    <div data-testid='progress-bar'>
      <div className={percent}>{props.progress.toFixed(0)}%</div>
      <LinearProgress
        className={progressBar}
        variant='determinate'
        value={props.progress > 100 ? 100 : props.progress}
      />
    </div>
  )
}
