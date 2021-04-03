import MuiTableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core'

export const TableCell = withStyles({
  root: {
    borderBottom: 'none',
    paddingLeft: 0,
    paddingRight: 0
  }
})(MuiTableCell)
