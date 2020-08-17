import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import WithdrawalList from './list'
import { useStore } from '../../store'

const BankWithdraw = () => {
  const store = useStore()
  store.setTitle('Withdraw to your Bank Account')

  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>withdraw fields</Grid>
      <Grid item>
        <Box px={4}>
          <Typography variant='h3'>Recent Withdrawals</Typography>
          <WithdrawalList />
        </Box>
      </Grid>
    </Grid>
  )
}

export default BankWithdraw
