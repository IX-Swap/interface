import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  box: {
    width: theme.spacing(115),
    height: theme.spacing(46.5),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2.1),
    display: 'flex',
    flexDirection: 'row'
  },
  boxAlert: {
    width: theme.spacing(115),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2.1),
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(43),
      flexDirection: 'column',
      borderRadius: 0,
      padding: theme.spacing(2.5)
    }
  },
  pageHeader: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  iconSuccess: {
    width: theme.spacing(18.6),
    margin: theme.spacing(8, 0, 0, 7.2),
    [theme.breakpoints.down('md')]: {
      width: '303px',
      display: 'flex',
      justifyContent: 'center',
      margin: 0
    }
  },
  topText: {
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(3)
    }
  },
  icon2fa: {
    width: theme.spacing(17.8),
    margin: theme.spacing(8, 0, 0, 7.9),
    [theme.breakpoints.down('md')]: {
      width: '303px',
      display: 'flex',
      justifyContent: 'center',
      margin: 0
    }
  },
  mainContent: {
    marginTop: theme.spacing(8),
    height: theme.spacing(29),
    width: theme.spacing(60),
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(38.1),
      textAlign: 'center',
      marginTop: theme.spacing(1.5)
    }
  },
  button: {
    width: theme.spacing(15.6),
    marginTop: theme.spacing(3),
    padding: '16px !important',
    boxShadow: 'none',
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(38)
    }
  },
  text: {
    fontSize: theme.spacing(2),
    fontWeight: 400,
    lineHeight: theme.spacing(3),
    opacity: '80%',
    [theme.breakpoints.down('md')]: {
      lineHeight: theme.spacing(2.5),
      fontSize: theme.spacing(1.7)
    }
  },
  successPageIcon: {
    width: 81.82,
    height: theme.spacing(12.5),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(7.5),
      height: 73
    }
  }
}))
