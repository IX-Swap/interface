import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  firstBlock: {
    width: 'initial',
    paddingRight: 0,
    [theme.breakpoints.down('sm')]: {
      width: '50%',
      paddingRight: theme.spacing(1)
    }
  },
  secondBlock: {
    width: 'initial',
    [theme.breakpoints.down('sm')]: {
      width: '50%'
    }
  },
  label: {
    fontWeight: 600
  },
  value: {
    whiteSpace: 'nowrap'
  }
}))
