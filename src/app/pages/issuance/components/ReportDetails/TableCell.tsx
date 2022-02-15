import { withStyles } from '@mui/styles'
import { TableCell as MuiTableCell } from '@mui/material'

export const TableCell = withStyles({
  root: {
    borderBottom: 'none'
  }
})(MuiTableCell)
