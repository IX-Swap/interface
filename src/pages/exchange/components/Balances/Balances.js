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
    minHeight: 240,
    padding: 20
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#EFEFEF'
    },
    height: 10
  },
  lastTableRow: {
    borderTop: '2px solid gray'
  }
}))

export default function Balances ({ balances }) {
  const classes = useStyles()
  const assets = Object.keys(balances)
  return (
    <Grid item>
      <Paper elevation={0} className={classes.paper}>
        <Box>
          <TableContainer>
            <Table size='small' aria-label='list of the markets'>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>ASSET</b>
                  </TableCell>
                  <TableCell align='right'>
                    <b>BALANCE</b>
                  </TableCell>
                  <TableCell align='right'>
                    <b>VALUE</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assets.map((m, i) => (
                  <TableRow key={i} className={classes.tableRow}>
                    <TableCell component='th' scope='row'>
                      {m}
                    </TableCell>
                    <TableCell align='right'>{balances[m]}</TableCell>
                    <TableCell align='right'>{balances[m]}</TableCell>
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
