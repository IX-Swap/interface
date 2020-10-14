import React from 'react'
import { Paper, Grid } from '@material-ui/core'
import { Header } from 'v2/app/pages/accounts/pages/banks/BanksList/Header'
import { Table } from 'v2/app/pages/accounts/pages/banks/BanksList/Table'
import { VSpacer } from 'v2/components/VSpacer'

export const BanksList: React.FC = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Header />
      </Grid>
      <VSpacer size='small' />
      <Grid item component={Paper}>
        <Table />
      </Grid>
    </Grid>
  )
}
