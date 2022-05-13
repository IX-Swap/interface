import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  boxHeader: {
    marginLeft: theme.spacing(23),
    paddingTop: theme.spacing(5.7)
  },
  box: {
    width: theme.spacing(115),
    height: theme.spacing(46.5),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2.1),
    display: 'flex',
    flexDirection: 'row',
    '& button': {
      width: theme.spacing(15.6),
      marginTop: theme.spacing(3),
      padding: '16px !important'
    }
  },
  boxAlert: {
    width: theme.spacing(115),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2.1),
    display: 'flex',
    flexDirection: 'row',
    '& button': {
      width: theme.spacing(16.8),
      marginTop: theme.spacing(3),
      padding: '16px !important'
    }
  },
  iconSuccess: {
    width: theme.spacing(18.6),
    margin: theme.spacing(8, 0, 0, 7.2)
  },
  icon2fa: {
    width: theme.spacing(17.8),
    margin: theme.spacing(8, 0, 0, 7.9)
  },
  mainContent: {
    marginTop: theme.spacing(8),
    height: theme.spacing(29),
    width: theme.spacing(60)
  },
  text: {
    fontSize: theme.spacing(2),
    fontWeight: 400,
    lineHeight: theme.spacing(3),
    opacity: '80%'
  },
  header: {
    '& makeStyles-wrapper-32 MuiBox-root css-0': {
      height: '500px'
    }
  },
  breadcrumbs: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    paddingBot: theme.spacing(10),
    '& p': {
      fontSize: theme.spacing(1.8),
      lineHeight: theme.spacing(3)
    }
  },
  breadcrumbsLink: {
    color: theme.palette.breadcrumbs.link
  },
  dot: {
    component: 'span',
    borderRadius: theme.spacing(12.5),
    margin: theme.spacing(0, 1.5)
  }
}))
