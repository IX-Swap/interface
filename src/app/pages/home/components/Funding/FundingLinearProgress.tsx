import { createStyles, withStyles, Theme } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

export const FundingLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 40,
      borderRadius: 5
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
    },
    bar: {
      borderRadius: 5,
      backgroundColor: theme.palette.success.main
    }
  })
)(LinearProgress)
