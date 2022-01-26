import MuiTableCell from '@mui/material/TableCell'
import withStyles from '@mui/styles/withStyles';

export const TableCell = withStyles({
  root: {
    borderBottom: 'none',
    paddingLeft: 0,
    paddingRight: 0
  }
})(MuiTableCell)
