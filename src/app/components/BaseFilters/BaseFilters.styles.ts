import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  searchWrapper: {
    width: 280
  },
  filterWrapper: {
    marginTop: -24,
    [theme.breakpoints.down('lg')]: {
      paddingTop: 24,
      marginTop: 0
    }
  },
  childrenWRapper: {
    justifyContent: 'flex-end',
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'flex-start'
    }
  }
}))
