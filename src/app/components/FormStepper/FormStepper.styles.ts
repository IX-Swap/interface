import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
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
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 0,
      gap: 0,
      marginBottom: theme.spacing(2)
    }
  },
  stepperBlock: {
    width: '100%'
  },
  stepperBlockWrapper: {
    borderRadius: 8,
    padding: theme.spacing(4.5, 0),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2.5)
    }
  }
}))
