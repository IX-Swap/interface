import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  tab: {
    color: theme.palette.primary.main,
    padding: 0,
    minWidth: 120,
    '& .MuiTab-wrapper': {
      fontSize: '.85rem'
    }
  },
  tabPanel: {
    '& .MuiTableBody-root': {
      display: 'block',
      height: 300,
      overflowY: 'auto',
      width: '100%'
    },
    '& .MuiTableHead-root, & .MuiTableRow-root': {
      display: 'table',
      tableLayout: 'fixed',
      width: '100%'
    },
    '& .MuiTableHead-root': {
      width: '95%'
    }
  }
}))
