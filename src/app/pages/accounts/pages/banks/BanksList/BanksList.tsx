import React from 'react'
import { Grid } from '@material-ui/core'
import { Header } from 'app/pages/accounts/pages/banks/BanksList/Header'
import { Table } from 'app/pages/accounts/pages/banks/BanksList/Table'
import { VSpacer } from 'components/VSpacer'

export const BanksList: React.FC = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Header />
      </Grid>
      <VSpacer size='small' />
      <Grid item>
        <Table />
      </Grid>
    </Grid>
  )
}
