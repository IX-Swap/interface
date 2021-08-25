import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { VSpacer } from 'components/VSpacer'

export const VirtualAccountTransactions = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Virtual Account Transactions' />
        <VSpacer size={'medium'} />
      </Grid>
    </Grid>
  )
}
