import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    paddingTop: theme.spacing(2)
  },
  leftBlock: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 16,
    padding: theme.spacing(8, 25, 28),
    marginRight: theme.spacing(2.5),
    width: 'calc(70% - 20px)'
  },
  rightBlock: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 16,
    padding: theme.spacing(5, 0, 5),
    width: '30%',
    height: 'max-content'
  },
  progressTitle: {
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(0.5),
    fontSize: 18,
    fontWeight: 600
  }
}))
