import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import {
  tokenList,
  useTokenListState,
  useTokenListDispatch
} from '../../../context/TokenListContext'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

export default function TokenListTable () {
  const tokenListState = useTokenListState()
  const tokenListDispatch = useTokenListDispatch()

  const classes = useStyles()

  function requestTokenList() {
    tokenList(tokenListDispatch)
  }

  useEffect(() => {
    if (!tokenListState.success && !tokenListState.isLoading) {
      requestTokenList()
    }
  })

  const renderTableRows = () => {
    return tokenListState.data.map(token => (
      <TableRow key={token._id}>
        <TableCell component="th" scope="row">
          {token.name}
        </TableCell>
        <TableCell align="right">{token.symbol}</TableCell>
        <TableCell align="right">Quorom</TableCell>
        <TableCell align="right">{token.token}</TableCell>
      </TableRow>
    ))
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell align="right"><b>Symbol</b></TableCell>
            <TableCell align="right"><b>Network</b></TableCell>
            <TableCell align="right"><b>Contract Address</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tokenListState.success ? renderTableRows() : null }
        </TableBody>
      </Table>
    </TableContainer>
  )
}