import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.backgrounds.default,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingTop: theme.spacing(2.5),
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  },
  buttonBox: {
    paddingTop: theme.spacing(16.6),
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    '& a': {
      width: theme.spacing(12.5),
      height: theme.spacing(6.1)
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(2),
      justifyContent: 'center',
      '& a': {
        width: theme.spacing(20.5)
      }
    }
  },
  index: {
    zIndex: 2
  },
  approveButton: {
    paddingRight: theme.spacing(12.5),
    paddingTop: theme.spacing(17),
    '& div': {
      width: theme.spacing(13.7),
      textAlign: 'center'
    },
    zIndex: 5,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
}))
