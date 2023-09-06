import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    // border: '1px solid black',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  tabs: {
    // border: '1px solid black',
    display: 'flex',
    alignItems: 'end',
    zIndex: 5,
    '& button': {
      textTransform: 'capitalize',
      '&[aria-selected="true"]': {
        color: theme.palette.text.primary,
        textTransform: 'capitalize'
      }
    }
  },
  profile: {
    flexGrow: 1
  },
  buttonBox: {
    zIndex: 2,
    alignItems: 'end',
    paddingTop: theme.spacing(14.2),
    display: 'flex',
    justifyContent: 'flex-end',
    width: '300px',
    '& a': {
      width: theme.spacing(12.5),
      height: theme.spacing(6.1)
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(2),
      justifyContent: 'center',
      '& a': {
        width: theme.spacing(20.6)
      }
    }
  },
  wrapper: {
    marginTop: theme.spacing(2),
    flexDirection: 'column-reverse',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  },
  content: {
    width: 'calc(100% - 312px)',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  rightBlock: {
    width: 296,
    marginLeft: theme.spacing(2),
    gap: theme.spacing(2),
    alignContent: 'flex-start',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 0,
      gap: 0,
      marginBottom: theme.spacing(2)
    }
  }
}))
