import { withStyles } from '@mui/styles'
import { TableRow as MuiTableRow } from '@mui/material'

export const TableRow = withStyles({
  root: {
    borderBottom: 'none'
  }
})(MuiTableRow)
