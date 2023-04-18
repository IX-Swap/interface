import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  breadcrumbs: {
    color: theme.palette.breadcrumbs.color
  },
  breadcrumbsLink: {
    color: theme.palette.breadcrumbs.link
  },
  container: {
    padding: theme.spacing(3),
    maxWidth: theme.spacing(162.5),
    backGroundColor: theme.palette.backgrounds.default,
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(0),
      paddingTop: theme.spacing(1.25)
    }
  },
  nameIdentity: {
    zIndex: 5,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  grid: {
    spacing: theme.spacing(4.2),
    paddingTop: theme.spacing(2.7)
  },
  dot: {
    component: 'span',
    borderRadius: theme.spacing(12.5),
    margin: theme.spacing(0, 1.5)
  },
  box: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    paddingBot: theme.spacing(10),
    '& p': {
      fontSize: theme.spacing(1.8),
      lineHeight: theme.spacing(3)
    }
  },
  createIdentity: {
    paddingTop: theme.spacing(3.4),
    paddingBottom: theme.spacing(7),
    '& p': {
      paddingTop: theme.spacing(1)
    }
  },

  investorIdentity: {
    color: '#3B4251',
    fontSize: '14px',
    lineHeight: '14px',
    letterSpacing: '-0.01em;',
    // marginTop: '25px',
    textTransform: 'capitalize'
  },
  investorIdentitySub: {
    color: '#778194',
    fontSize: '14px',
    lineHeight: '14px',
    letterSpacing: '-0.01em;',
    marginTop: '12px',
    textTransform: 'capitalize'
  },
  bbox: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gap: '10px',
    padding: '10px',
    width: 'inherit',
    '& div': {
      textAlign: 'center',
      fontSize: '30px'
    }
  },
  item1: {
    gridRow: '1 / 4'
  }
  // bbox > div {

  // }
}))
