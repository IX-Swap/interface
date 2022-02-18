import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1.5, 2),
    backgroundColor:
      theme.palette.mode === 'light' ? '#F6F4FD' : theme.palette.primary.dark,
    borderRadius: 4
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text: {
    margin: theme.spacing(0.5, 2, 0)
  }
}))
