import { withStyles } from '@material-ui/core/styles'
import MuiTableRow from '@material-ui/core/TableRow'

export const TableRow = withStyles({
  root: {
    borderBottom: 'none'
  }
})(MuiTableRow)
