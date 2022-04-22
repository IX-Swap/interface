import React from 'react'
import { Grid } from '@mui/material'
import { Header } from 'app/pages/accounts/pages/banks/pages/BanksList/Header'
import { Table } from 'app/pages/accounts/pages/banks/pages/BanksList/Table'
import { VSpacer } from 'components/VSpacer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const BanksList: React.FC = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Bank Accounts' />
      </Grid>
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
