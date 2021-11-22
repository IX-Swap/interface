import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  filterText: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2)
    }
  },
  filtersWrapper: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      flexWrap: 'wrap',
      justifyContent: 'flex-start'
    }
  },
  filterWrapper: {
    '&:first-of-type': {
      marginRight: theme.spacing(2)
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2)
    }
  }
}))
