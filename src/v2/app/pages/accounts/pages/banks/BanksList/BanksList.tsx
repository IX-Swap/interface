import React from 'react'
import { Paper, Grid } from '@material-ui/core'
import { Header } from 'v2/app/pages/accounts/pages/banks/BanksList/Header'
import { Table } from 'v2/app/pages/accounts/pages/banks/BanksList/Table'

export const BanksList: React.FC = () => {
  return (
    <Grid container component={Paper} spacing={4} direction='column'>
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        <Table />
      </Grid>
    </Grid>
  )
}
