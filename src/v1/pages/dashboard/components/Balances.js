import React from 'react'
import { withRouter } from 'react-router-dom'
import {
  Grid,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#e3e3e3',
    color: theme.palette.common.grey
  },
  body: {
    fontSize: 14,
    fontColor: 'black'
  }
}))(TableCell)
function createData (name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow)
const rows = [createData('IXPS', 159, 6.0), createData('IXCS', 305, 3.7)]

const useStyles = makeStyles({
  table: {
    minWidth: 300
  }
})

function Balances (props) {
  const classes = useStyles()

  return (
    <Grid item>
      {/* <Paper elevation={1} variant='outlined'> */}
      <Box p={3}>
        <TableContainer component={Paper} elevation={0} variant='outlined'>
          <Table className={classes.table} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>ASSET</StyledTableCell>
                <StyledTableCell align='right'>BALANCE</StyledTableCell>
                <StyledTableCell align='right'>24 +/-</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component='th' scope='row'>
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{row.fat}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* </Paper> */}
    </Grid>
  )
}

export default withRouter(Balances)
