import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  headColumn: {
    border: '1px solid #DDDDDD',
    padding: theme.spacing(0.5, 2),
    fontSize: 14,
    fontWeight: 600,
    backgroundColor: '#F7F7F7'
  },
  column: {
    border: '1px solid #DDDDDD',
    padding: theme.spacing(0.5, 2),
    fontSize: 14
  },
  firstRow: {
    backgroundColor: '#F2F2FF',
    '& > td': {
      fontSize: 14,
      fontWeight: 600
    }
  },
  row: {
    backgroundColor: '#F7F7F7'
  },
  lastRow: {
    backgroundColor: '#E7E7E7',
    '& > th': {
      fontSize: 14,
      fontWeight: 600
    },
    '& > td': {
      fontSize: 14,
      fontWeight: 600
    }
  }
}))
