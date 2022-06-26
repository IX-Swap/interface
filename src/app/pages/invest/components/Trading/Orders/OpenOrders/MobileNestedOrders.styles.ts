import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  drawer: {
    padding: theme.spacing(2.5),
    borderRadius: '8px 8px 0 0',
    backgroundColor: theme.palette.background.paper
  },
  close: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  header: {
    color: theme.palette.mode === 'light' ? '#666666' : '#ffffff'
  },
  separator: {
    height: 1,
    width: '100%',
    background: '#DDDDDD',
    margin: theme.spacing(2, 0)
  },
  tableRow: {
    borderBottom: 'none'
  },
  headerCell: {
    color: theme.palette.mode === 'light' ? '#666666' : '#ffffff',
    padding: theme.spacing(0, 2, 0, 0)
  },
  dataCell: {
    padding: theme.spacing(0, 2, 0, 0)
  },
  rowBox: {
    backgroundColor: theme.palette.mode === 'light' ? '#F6F4FD' : '#494166',
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1.25)
  }
}))
