import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  wrapper: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-start',
      paddingBottom: theme.spacing(1)
    }
  },
  item: {
    paddingRight: 0,
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(3)
    }
  },
  text: {
    fontWeight: 600
  }
}))
