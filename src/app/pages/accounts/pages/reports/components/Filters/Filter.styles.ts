import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  filterText: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2)
    }
  },
  filtersWrapper: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },
  filterWrapper: {
    '&:first-of-type': {
      marginRight: theme.spacing(2)
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2)
    }
  }
}))
