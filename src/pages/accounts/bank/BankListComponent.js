import React, { useEffect } from 'react'
import {
  Box,
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  CircularProgress
} from '@material-ui/core'
import {
  useBankListDispatch,
  useBankListState,
  listBankAccount
} from './BankListContext'
import { withRouter, useHistory } from 'react-router-dom'

function BankListComponent (props) {
  const { bankListState } = useBankListLogic()
  return (
    <Grid container justify='center' alignItems='center'>
      <Grid item xs={12} sm={12} md={12} lg={8}>
        {bankListState.isLoading ? (
          <CircularProgress />
        ) : !bankListState.data.length && bankListState.success ? (
          <AddBankAccount />
        ) : (
          <ListBankAccounts list={bankListState.data} />
        )}
      </Grid>
    </Grid>
  )
}

function ListBankAccounts ({ list }) {
  const history = useHistory()
  return (
    <Card title='Bank Accounts'>
      <Box p={3}>
        <TableContainer component={Paper}>
          <Table aria-label='accounts table'>
            <TableHead>
              <TableRow>
                <TableCell>Currency</TableCell>
                <TableCell>Account Id</TableCell>
                <TableCell align='right'>Balance</TableCell>
                <TableCell align='right'>Account Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map(row => (
                <TableRow key={row._id}>
                  <TableCell component='th' scope='row'>
                    {row.account.asset.symbol}
                  </TableCell>
                  <TableCell>{row.account._id}</TableCell>
                  <TableCell align='right'>{row.account.balance}</TableCell>
                  <TableCell align='right'>
                    {row.authorized ? 'Authroized' : 'Unauthorized'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box m={3}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              history.push(`/accounts/bank-create`)
            }}
          >
            ADD BANK ACCOUNT
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

function AddBankAccount (props) {
  return (
    <Card>
      <Box m={4} p={4}>
        <Grid container direction='column' justify='center' alignItems='center'>
          <Typography paragraph>
            You have not added a bank account. Please add a bank account.
          </Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              props.history.push(`/accounts/bank-create`)
            }}
          >
            ADD BANK ACCOUNT
          </Button>
        </Grid>
      </Box>
    </Card>
  )
}

function useBankListLogic () {
  const bankDispatch = useBankListDispatch()
  const bankListState = useBankListState()

  const loadBanks =
    !bankListState.success && !bankListState.isLoading && !bankListState.error

  useEffect(() => {
    if (loadBanks) {
      listBankAccount(bankDispatch)
    }
  }, [bankListState, bankDispatch, loadBanks])

  return { bankDispatch, bankListState, loadBanks }
}

export default withRouter(BankListComponent)
