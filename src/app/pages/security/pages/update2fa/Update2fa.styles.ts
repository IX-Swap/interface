import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(2, 0, 5),
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column-reverse'
    }
  },
  leftBlock: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 16,
    padding: theme.spacing(8, 3, 8),
    marginRight: theme.spacing(2.5),
    width: 'calc(100% - 316px)',
    [theme.breakpoints.down('lg')]: {
      width: '100%'
    }
  },
  rightBlock: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 16,
    padding: theme.spacing(5, 0, 5),
    width: 296,
    height: 'max-content',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
      marginBottom: theme.spacing(3)
    }
  },
  progressTitle: {
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(0.5),
    fontSize: 18,
    fontWeight: 600
  }
}))
