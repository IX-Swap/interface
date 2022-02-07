import { withStyles } from '@material-ui/core/styles'
import MuiTableCell from '@material-ui/core/TableCell'

export const TableCell = withStyles({
  root: {
    borderBottom: 'none'
  }
})(MuiTableCell)
