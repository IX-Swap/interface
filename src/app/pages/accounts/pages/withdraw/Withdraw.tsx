import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { WithdrawForm } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/WithdrawForm'
import { Setup } from 'app/pages/accounts/pages/withdraw/components/Setup'
import React from 'react'
import { BackToCash } from './components/BackToCash'
import { useStyles } from 'app/pages/accounts/pages/withdraw/components/Withdraw.styles'
export const Withdraw = () => {
  const { container, formWrapper } = useStyles()
  return (
    <Grid
      container
      direction='column'
      className={container}
      spacing={{ xs: 0, sm: 3 }}
      paddingBottom={3}
    >
      <Grid item>
        <PageHeader
          title='Cash Withdrawal'
          styled={false}
          padded={true}
          variant='h1'
          alignment='center'
          showBreadcrumbs={false}
          startComponent={<BackToCash />}
        />
      </Grid>
      <Grid item container justifyContent={'center'}>
        <Grid item className={formWrapper}>
          <WithdrawForm>
            <Setup />
          </WithdrawForm>
        </Grid>
      </Grid>
    </Grid>
  )
}
