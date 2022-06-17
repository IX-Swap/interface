import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  drawer: {
    padding: theme.spacing(2.5),
    borderRadius: '8px 8px 0 0'
  },
  close: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  header: {
    color: theme.palette.mode === 'light' ? '#666666' : '#ffffff'
  }
}))
