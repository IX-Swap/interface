import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    justifyContent: 'center',
    display: 'flex',
    textAlign: 'center',
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(0)
    }
  },
  approveButton: {
    padding: theme.spacing(1.5, 0, 2.5, 0),
    '& div': {
      width: theme.spacing(13.7),
      textAlign: 'center'
    },
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  containerAvatar: {
    justifyContent: 'center',
    display: 'flex',
    marginBottom: theme.spacing(3.5),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3)
    }
  },
  whiteBackground: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '100%',
    height: theme.spacing(33.4),
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  preview: {
    zIndex: 5,
    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.background.paper,
      paddingTop: theme.spacing(2.5),
      width: theme.spacing(43)
    }
  },
  textCorporate: {
    color: theme.palette.text.secondary,
    maxWidth: theme.spacing(40)
  },
  isIndividualGrid: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(1)
    }
  },
  emptyBox: {
    height: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      height: theme.spacing(2)
    }
  }
}))
