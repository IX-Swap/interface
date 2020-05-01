import React from 'react'
import {
  Grid,
  Paper,
  Box,
  makeStyles,
  TableCell,
  TableRow,
  TableBody,
  Table,
  TableContainer,
  TableHead
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 400,
    padding: 20
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#EFEFEF'
    }
  }
}))

export default function Markets ({ state, setMarket }) {
  const classes = useStyles()
  return (
    <Grid item>
      <Paper elevation={0} className={classes.paper}>
        <Box>
          <TableContainer>
            <Table size='small' aria-label='list of the markets'>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>MARKET</b>
                  </TableCell>
                  <TableCell align='right'>
                    <b>24 HOURS</b>
                  </TableCell>
                  <TableCell align='right'>
                    <b>PRICE</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.markets.map((m, i) => (
                  <TableRow
                    key={i}
                    onClick={() => setMarket(m)}
                    className={classes.tableRow}
                  >
                    <TableCell component='th' scope='row'>
                      {m}
                    </TableCell>
                    <TableCell align='right'>
                      {state[m].market.change}%
                    </TableCell>
                    <TableCell align='right'>
                      ${state[m].market.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Grid>
  )
}
