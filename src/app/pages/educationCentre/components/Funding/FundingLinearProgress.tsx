import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import LinearProgress from '@mui/material/LinearProgress'

export const FundingLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 40,
      borderRadius: 5
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 700]
    },
    bar: {
      borderRadius: 5,
      backgroundColor: theme.palette.success.main
    }
  })
)(LinearProgress)
