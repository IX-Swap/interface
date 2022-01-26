import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3.75)
  },
  contentWrapper: {
    position: 'relative'
  },
  chartWrapper: {
    '& > div': {
      padding: 0
    }
  }
}))
