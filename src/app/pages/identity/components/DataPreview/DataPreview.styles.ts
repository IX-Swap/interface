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
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3)
    }
  },
  whiteBackground: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '100%',
    // height: theme.spacing(33.4),
    height: theme.spacing(57),
    // borderBottom: '1px solid black',
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  preview: {
    display: 'flex',
    zIndex: 5,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper,
      paddingTop: theme.spacing(2.5),
      width: theme.spacing(43)
    }
  },
  corporateName: {
    display: 'flex',
    gap: 8,
    marginBottom: theme.spacing(3.5)
  },
  dataContainer: {
    display: 'flex',
    gap: 80,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: 20
    }
  },
  dataBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: 10,
    [theme.breakpoints.down('md')]: {
      alignItems: 'center'
    }
  },
  dataLabel: {
    maxWidth: theme.spacing(40)
  },
  dataValue: {
    color: theme.palette.text.secondary
  },
  isIndividualGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      alignItems: 'center',
      paddingTop: theme.spacing(1)
    }
  },
  emptyBox: {
    height: theme.spacing(13),
    [theme.breakpoints.down('md')]: {
      height: theme.spacing(2)
    }
  }
}))
