import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  drawer: {
    padding: theme.spacing(2.5),
    borderRadius: '8px 8px 0 0',
    backgroundColor: theme.palette.background.paper
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  header: {
    color: theme.palette.mode === 'light' ? '#666666' : '#ffffff',
    lineHeight: 1.5
  },
  tableRow: {
    borderBottom: 'none'
  },
  rowBox: {
    backgroundColor: theme.palette.mode === 'light' ? '#F6F4FD' : '#494166',
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1.25)
  }
}))
