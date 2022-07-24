import React from 'react'
import { Grid } from '@mui/material'
import { Header } from 'app/pages/accounts/pages/banks/pages/BanksList/Header'
import { Table } from 'app/pages/accounts/pages/banks/pages/BanksList/Table'
import { VSpacer } from 'components/VSpacer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'

export const BanksList: React.FC = () => {
  return (
    <Grid container direction='column' spacing={2} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Bank Accounts' endComponent={<Header />} />
      </Grid>
      <RootContainer>
        <VSpacer size='small' />
        <Grid item ml='10px'>
          <Table />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
